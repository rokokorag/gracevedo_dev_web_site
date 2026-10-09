# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Bilingual (English / Spanish) single-page portfolio for gracevedo.dev. Astro 7 with static output, Tailwind CSS v4 and pnpm. No client framework and no test suite.

## Commands

```sh
pnpm install
pnpm check          # astro check: type-check, including en/es translation parity
pnpm build          # astro check && astro build -> dist/
pnpm preview        # serve dist/ locally
pnpm format         # Prettier (astro + tailwind plugins); format:check to verify only
pnpm brand          # regenerate favicons and public/og/og-{en,es}.png
```

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

`astro check` is the only correctness gate, so run `pnpm check` after any change to locales or `src/data/`.

## Architecture

**Routing and i18n.** `src/pages/` holds thin routes (`index.astro`, `404.astro`, `es/index.astro`, `es/404.astro`) that only render `components/pages/HomePage` or `NotFoundPage` with a `lang` prop. English has no URL prefix (`prefixDefaultLocale: false`). Every component takes `lang: Locale` and calls `useTranslations(lang)` from `src/i18n/utils.ts`. Build URLs with `localeUrl` / `absoluteLocaleUrl` there, not by hand.

**Text and data are separate, joined by `id`.**

- All visible text lives in `src/i18n/locales/en.json` and `es.json`. `es.json` is typed against `en.json`, so a key missing from `es.json` fails `astro check`.
- Language-independent data (URLs, dates, images, tags) lives in `src/data/*.ts`. IDs are typed from the locale keys (for example `ProjectId = keyof Translations["projects"]["items"]`). A new item needs an entry in both the data file and both locale files.
- Dates are `"YYYY-MM"` strings, formatted with `formatMonthYear` (UTC, so the month never shifts).

**Inline text conventions in locale strings:**

- `*word*` renders in the serif italic accent font (`components/ui/SerifText.astro`), used in section titles and the 404 heading.
- `[Label](project-id)` inside an experience highlight links to that project's `url` from `src/data/projects.ts` (parsed in `sections/Experience.astro`).

**Images.** Put them in `src/assets/` and import them from `src/data/`, so `astro:assets` optimizes them. Don't put them in `public/`. `public/` is for favicons, OG images and `robots.txt`.

**Styling.** Design tokens are in `@theme` in `src/styles/global.css`. Fonts are self-hosted through Astro's Fonts API (`fonts` in `astro.config.mjs`, exposed as `--font-geist`, `--font-geist-mono` and `--font-instrument-serif`). Entrance animations (`.reveal`) only hide content under `html.js`, which is set inline in `<head>`, and they respect `prefers-reduced-motion`. Content must stay visible without JS.

**SEO and 404s.** `components/layout/BaseLayout.astro` emits the canonical URL, `hreflang` (en, es, x-default) and OG/Twitter metadata with a per-language image. Pass `noindex` for pages that should stay out of search. A custom integration in `astro.config.mjs` copies `dist/es/404/index.html` to `dist/es/404.html` so hosts serve the Spanish 404 under `/es/`. The sitemap excludes 404 pages.

**Brand assets.** `scripts/brand-assets.mjs` converts text to SVG paths with opentype.js, using the `@fontsource` files, and rasterizes it with sharp. The OG images are built from `hero.eyebrow` and `hero.headline` in each locale, so rerun `pnpm brand` after changing the hero copy. Its color constants duplicate the theme tokens.

**Deployment.** Cloudflare Workers serves `dist/` as static assets (`wrangler.jsonc`, `not_found_handling: "404-page"`). Node version is pinned in `.node-version` (Node 22.12 or later).

## Specs

Behavior specs use OpenSpec and live in `openspec/specs/` (`portfolio-home`, `site-i18n`, `site-presentation`). Archived changes are in `openspec/changes/archive/`. The `openspec-*` / `opsx:*` skills drive the propose, apply and archive workflow.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
