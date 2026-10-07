// Generates the favicon set and the Open Graph images from the site's fonts.
// Text is converted to SVG paths, so the output never depends on installed fonts.
// Run with `pnpm brand` after changing the hero copy in src/i18n/locales/*.json.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import opentype from "opentype.js";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const fontsDir = new URL("node_modules/@fontsource/", root);
const publicDir = new URL("public/", root);

const colors = {
  bg: "#0a0a0b",
  border: "#27272a",
  fg: "#fafafa",
  muted: "#a1a1aa",
  accent: "#ef4444",
  accentStrong: "#b91c1c",
  accentSoft: "#fca5a5",
};

async function loadFont(path) {
  const buffer = await readFile(new URL(path, fontsDir));
  return opentype.parse(
    buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ),
  );
}

const fonts = {
  serifItalic: await loadFont(
    "instrument-serif/files/instrument-serif-latin-400-italic.woff",
  ),
  sans: await loadFont("geist/files/geist-latin-600-normal.woff"),
  mono: await loadFont("geist-mono/files/geist-mono-latin-400-normal.woff"),
};

// Text is laid out glyph by glyph (advance + kerning) instead of using
// font.getPath(): opentype.js can't apply some of these fonts' contextual
// substitution lookups, and plain glyphs read fine at these sizes.
function layout(font, text, x, y, size, letterSpacing = 0) {
  const scale = size / font.unitsPerEm;
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  const paths = [];
  let cursor = x;
  glyphs.forEach((glyph, i) => {
    // Some pairs have no kerning entry (undefined), which would turn the cursor into NaN.
    if (i > 0)
      cursor += (font.getKerningValue(glyphs[i - 1], glyph) || 0) * scale;
    paths.push(glyph.getPath(cursor, y, size));
    cursor += (glyph.advanceWidth || 0) * scale + letterSpacing;
  });
  return { paths, width: cursor - x - (glyphs.length ? letterSpacing : 0) };
}

// opentype.js's Path#toPathData occasionally emits "NaN" when it optimizes
// commands, so path data is serialized by hand.
const n = (v) => +v.toFixed(2);
function pathData(path) {
  return path.commands
    .map((c) => {
      switch (c.type) {
        case "M":
        case "L":
          return `${c.type}${n(c.x)} ${n(c.y)}`;
        case "Q":
          return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
        case "C":
          return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
        default:
          return "Z";
      }
    })
    .join("");
}

/** SVG path data for `text` with its baseline-left corner at (x, y). */
function textPath(font, text, x, y, size, letterSpacing = 0) {
  return layout(font, text, x, y, size, letterSpacing)
    .paths.map(pathData)
    .join("");
}

function textWidth(font, text, size, letterSpacing = 0) {
  return layout(font, text, 0, 0, size, letterSpacing).width;
}

/** Bounding box of a single glyph rendered at the origin. */
function glyphBox(font, text, size) {
  const boxes = layout(font, text, 0, 0, size).paths.map((p) =>
    p.getBoundingBox(),
  );
  return {
    x1: Math.min(...boxes.map((b) => b.x1)),
    y1: Math.min(...boxes.map((b) => b.y1)),
    x2: Math.max(...boxes.map((b) => b.x2)),
    y2: Math.max(...boxes.map((b) => b.y2)),
  };
}

/** Word wrap with balanced line lengths (like CSS `text-wrap: balance`). */
function wrapBalanced(font, text, size, maxWidth) {
  const lines = wrap(font, text, size, maxWidth);
  if (lines.length < 2) return lines;
  let lo = 0;
  let hi = maxWidth;
  while (hi - lo > 1) {
    const mid = (lo + hi) / 2;
    if (wrap(font, text, size, mid).length === lines.length) hi = mid;
    else lo = mid;
  }
  return wrap(font, text, size, hi);
}

/** Greedy word wrap by measured width. */
function wrap(font, text, size, maxWidth) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && textWidth(font, next, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ---------------------------------------------------------------- favicon --

/** Red tile with a serif italic "R", optically centered. */
function faviconSvg({ rounded }) {
  const size = 64;
  const box = glyphBox(fonts.serifItalic, "R", 52);
  const dx = (size - (box.x2 - box.x1)) / 2 - box.x1;
  const dy = (size - (box.y2 - box.y1)) / 2 - box.y1;
  const d = textPath(fonts.serifItalic, "R", dx, dy, 52);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${rounded ? 14 : 0}" fill="${colors.accentStrong}"/>
  <path d="${d}" fill="${colors.fg}" stroke="${colors.fg}" stroke-width="1.6" stroke-linejoin="round"/>
</svg>
`;
}

/** Minimal ICO container holding PNG-encoded images. */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const favicon = faviconSvg({ rounded: true });
await writeFile(new URL("favicon.svg", publicDir), favicon);

const icoPngs = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await sharp(Buffer.from(favicon)).resize(size, size).png().toBuffer(),
  })),
);
await writeFile(new URL("favicon.ico", publicDir), ico(icoPngs));

// iOS rounds the corners itself, so the touch icon is a full-bleed square.
await sharp(Buffer.from(faviconSvg({ rounded: false })))
  .resize(180, 180)
  .png()
  .toFile(new URL("apple-touch-icon.png", publicDir).pathname);

// ------------------------------------------------------------ Open Graph --

const W = 1200;
const H = 630;
const PAD = 88;

function ogSvg(copy) {
  const eyebrow = copy.hero.eyebrow.toUpperCase();
  const name = "Rodrigo Acevedo.";
  const headlineSize = 58;
  const headlineLines = wrapBalanced(
    fonts.sans,
    copy.hero.headline,
    headlineSize,
    W - PAD * 2,
  );

  let y = 178;
  const parts = [];
  parts.push(
    `<rect x="${PAD}" y="${y - 7}" width="8" height="8" rx="4" fill="${colors.accent}"/>`,
    `<path d="${textPath(fonts.mono, eyebrow, PAD + 22, y, 20, 1.5)}" fill="${colors.muted}"/>`,
  );
  y += 118;
  parts.push(
    `<path d="${textPath(fonts.serifItalic, name, PAD - 4, y, 120)}" fill="${colors.fg}"/>`,
  );
  y += 82;
  for (const line of headlineLines) {
    parts.push(
      `<path d="${textPath(fonts.sans, line, PAD, y, headlineSize, -1.2)}" fill="url(#headline)"/>`,
    );
    y += headlineSize * 1.08;
  }

  // Footer: monogram tile + domain.
  const fy = H - 74;
  const tb = glyphBox(fonts.mono, "RA", 15);
  parts.push(
    `<rect x="${PAD}" y="${fy - 26}" width="36" height="36" rx="8" fill="${colors.accentStrong}"/>`,
    `<path d="${textPath(fonts.mono, "RA", PAD + 18 - (tb.x2 + tb.x1) / 2, fy - 8 - (tb.y2 + tb.y1) / 2, 15)}" fill="${colors.fg}"/>`,
    `<path d="${textPath(fonts.mono, "gracevedo", PAD + 52, fy, 24)}" fill="${colors.fg}"/>`,
    `<path d="${textPath(fonts.mono, ".dev", PAD + 52 + textWidth(fonts.mono, "gracevedo", 24), fy, 24)}" fill="${colors.accent}"/>`,
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="62%" cy="0%" r="70%">
      <stop offset="0%" stop-color="${colors.accentStrong}" stop-opacity="0.75"/>
      <stop offset="45%" stop-color="${colors.accentStrong}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${colors.accentStrong}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="headline" x1="0" y1="0" x2="1" y2="0.25">
      <stop offset="0%" stop-color="${colors.fg}"/>
      <stop offset="55%" stop-color="${colors.accentSoft}"/>
      <stop offset="100%" stop-color="${colors.accent}"/>
    </linearGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="${colors.border}" stroke-opacity="0.45"/>
    </pattern>
    <radialGradient id="gridMask" cx="60%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="fade"><rect width="${W}" height="${H}" fill="url(#gridMask)"/></mask>
  </defs>
  <rect width="${W}" height="${H}" fill="${colors.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#fade)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${parts.join("\n  ")}
</svg>
`;
}

await mkdir(new URL("og/", publicDir), { recursive: true });
for (const lang of ["en", "es"]) {
  const copy = JSON.parse(
    await readFile(new URL(`src/i18n/locales/${lang}.json`, root), "utf8"),
  );
  await sharp(Buffer.from(ogSvg(copy)))
    .png()
    .toFile(new URL(`og/og-${lang}.png`, publicDir).pathname);
}

console.log(
  "Brand assets written to public/: favicon.svg, favicon.ico, apple-touch-icon.png, og/og-{en,es}.png",
);
