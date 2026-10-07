// @ts-check
import { copyFile } from "node:fs/promises";
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://gracevedo.dev",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: ["300 800"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: ["400 600"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument-serif",
      weights: [400],
      styles: ["italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["ui-serif", "Georgia", "serif"],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // Links /  and /es/ as alternates of each other.
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", es: "es-MX" },
      },
      filter: (page) => !page.includes("/404"),
    }),
    {
      // Astro only emits the root 404 as `404.html`; hosts look for the nearest
      // `404.html`, so the Spanish one is copied next to its section.
      name: "localized-404",
      hooks: {
        "astro:build:done": async ({ dir }) => {
          await copyFile(
            new URL("es/404/index.html", dir),
            new URL("es/404.html", dir),
          );
        },
      },
    },
  ],
});
