# gracevedo.dev

Personal portfolio of **Rodrigo Acevedo**, Senior Software Engineer (Mobile & Web) and photographer. A single-page, bilingual (English / Spanish) static site.

- English: [gracevedo.dev](https://gracevedo.dev)
- Spanish: [gracevedo.dev/es](https://gracevedo.dev/es/)
- Photography: [portfolio.gracevedo.dev](https://portfolio.gracevedo.dev/)

## Stack

- [Astro](https://astro.build) 7, static output, with built-in i18n and the Fonts API
- [Tailwind CSS](https://tailwindcss.com) v4
- [@lucide/astro](https://lucide.dev) for UI icons and [Simple Icons](https://simpleicons.org) for brand logos
- Geist, Geist Mono and Instrument Serif, self-hosted
- pnpm, Prettier (with the Astro and Tailwind plugins) and `astro check`

## Getting started

Requires Node.js 22.12+ and pnpm.

```sh
pnpm install
pnpm dev          # http://localhost:4321 (or `astro dev --background`)
```

| Command             | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `pnpm dev`          | Start the dev server                                                |
| `pnpm build`        | Type-check (`astro check`) and build to `dist/`                     |
| `pnpm preview`      | Serve the production build locally                                  |
| `pnpm check`        | Type-check only. Fails if a translation key is missing in `es.json` |
| `pnpm format`       | Format the project with Prettier                                    |
| `pnpm format:check` | Check formatting without writing                                    |
| `pnpm brand`        | Regenerate the favicons and Open Graph images (see below)           |

## Project structure

```text
src/
├── pages/                 # Thin routes: they only render a page component with its `lang`
│   ├── index.astro        #   /       -> <HomePage lang="en" />
│   ├── 404.astro          #   /404    -> <NotFoundPage lang="en" />
│   └── es/                #   /es/, /es/404
├── components/
│   ├── pages/             # HomePage, NotFoundPage
│   ├── layout/            # BaseLayout (<head>, SEO), Navbar, Footer, LanguageSwitcher
│   ├── sections/          # Hero, Stats, About, Experience, Stack, Projects, Photography, Contact
│   └── ui/                # ProjectCard, PhoneFrame, ImageSlot, SectionHeading, SerifText, SocialIcon
├── i18n/
│   ├── locales/           # en.json, es.json: every piece of visible text
│   └── utils.ts           # useTranslations(lang), locale URLs, date formatting
├── data/                  # Language-independent data: URLs, dates, images, tags
├── assets/                # Images optimized by astro:assets (portrait, photos, projects)
└── styles/global.css      # Tailwind import, design tokens (@theme), animations
public/                    # Favicons, Open Graph images, robots.txt
scripts/brand-assets.mjs   # Favicon + Open Graph generator
openspec/                  # Specs and archived changes (OpenSpec)
```

## Editing content

Text and data live in separate places, joined by `id`:

- **Text** (anything a visitor reads) goes in `src/i18n/locales/en.json` and `es.json`. `es.json` is type-checked against `en.json`, so a missing key fails `pnpm build`.
- **Data** (URLs, dates, images, tech tags) goes in `src/data/*.ts`, once for both languages.

| To change…                           | Edit                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Email, photography URL, CV, portrait | `src/data/site.ts`                                                                                |
| Social links                         | `socials` in `src/data/site.ts` (a link only shows when it has a `url`)                           |
| Highlight numbers                    | `src/data/stats.ts` + `stats.items` in the locales                                                |
| Jobs                                 | `src/data/experience.ts` + `experience.companies` / `experience.roles` (omit `end` for "Present") |
| Tech stack                           | `src/data/stack.ts`                                                                               |
| Projects                             | `src/data/projects.ts` + `projects.items` in the locales                                          |
| Photos                               | `src/data/photos.ts` + `photography.photos.<id>.alt` in the locales                               |

### Small text conventions

- `*word*` inside a section title (and the 404 heading) renders in the serif italic accent font: `"Between code and *camera*."`
- `[Label](project-id)` inside an experience highlight links to that project's URL from `src/data/projects.ts`: `"Designed and built [Slabs: Sliding Puzzle](slabs)…"`

### Projects

Each project in `src/data/projects.ts` supports:

- `platforms` / `upcomingPlatforms`: `web`, `android` and `ios` (upcoming ones show "coming soon")
- `url`, `playStoreUrl`: links on the card, opened in a new tab
- `screenshot`: a raw phone screenshot, rendered inside a CSS phone frame
- `image`: a finished 16:9 mockup, shown as is
- `tags`: tech labels such as `["AstroJS"]`
- `featured`: the large card that leads the grid
- `legacy`: "Legacy" badge plus a "no longer available in the store" note

Cards with neither `screenshot` nor `image` show a platform placeholder.

### Images

Put images in `src/assets/` (not `public/`) and import them from `src/data/`. Astro converts them to WebP and generates responsive sizes. Recommended ratios: portrait and photos 4:5, project mockups 16:9.

## Brand assets

`pnpm brand` regenerates, from the site's fonts (text is converted to SVG paths):

- `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`: serif italic "R" on the red tile
- `public/og/og-en.png`, `public/og/og-es.png`: 1200 × 630 share images built from `hero.eyebrow` and `hero.headline` in each locale

Run it again after changing the hero copy.

## SEO

- `<html lang>`, canonical URL and `hreflang` alternates (`en`, `es`, `x-default`) on every page
- Open Graph and Twitter Card metadata with a per-language image
- `sitemap-index.xml` from `@astrojs/sitemap`, with `/` and `/es/` linked as alternates. 404 pages are excluded and marked `noindex`.
- `public/robots.txt` points to the sitemap

## Deployment

`pnpm build` outputs a fully static site in `dist/`, deployable to any static host (Cloudflare Pages, Vercel, Netlify…).

- Build command: `pnpm build`
- Output directory: `dist`
- Node.js 22.12+

The build writes both `dist/404.html` and `dist/es/404.html`. Hosts that serve the nearest `404.html` (such as Cloudflare Pages) show the Spanish page for missing URLs under `/es/`. Hosts that only use the root one show the English page.

## Accessibility and motion

- Keyboard-operable navigation (the mobile menu uses the Popover API), visible focus and a skip link
- WCAG AA contrast on the dark theme
- Entrance animations only run when JavaScript is available and `prefers-reduced-motion` is not set. Content is always visible otherwise.

## Specs

Behavior is described with [OpenSpec](https://github.com/Fission-AI/OpenSpec) in `openspec/specs/` (`portfolio-home`, `site-i18n`, `site-presentation`). The original build plan is archived in `openspec/changes/archive/`.
