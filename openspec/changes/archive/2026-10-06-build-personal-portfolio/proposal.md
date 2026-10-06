# Proposal

## Why

gracevedo.dev hoy es el starter vacío de Astro. Rodrigo necesita un portfolio profesional que cuente su trayectoria de 12+ años como Senior Software Engineer (mobile y web, fintech), su stack, sus proyectos freelance y side-projects, y que enlace a su portfolio de fotografía existente. El sitio debe verse actual y atractivo para reclutadores y clientes, tanto en inglés como en español.

## What Changes

- Se reemplaza la página starter por un portfolio de **una sola página** con secciones: Hero, Stats, About, Experience, Stack, Projects, Photography y Contact.
- Sitio **bilingüe**: inglés por defecto en `/` y español en `/es`, con selector de idioma.
- El contenido sale del CV: experiencia en Uexchange, Vest y Nuxiba (con sus roles), tecnologías agrupadas por categoría y proyectos independientes. **Slabs: Sliding Puzzle** es el proyecto destacado.
- La sección Contact muestra `hi@gracevedo.dev`. El teléfono **no** se publica.
- La sección Photography enlaza a `https://portfolio.gracevedo.dev/`.
- Las imágenes (capturas de proyectos, 3-4 fotos y retrato en About) quedan **pendientes**. El sitio muestra placeholders intencionales hasta que se agreguen.
- Diseño oscuro con acento rojo, responsive, accesible y con animaciones que respetan `prefers-reduced-motion`.
- Nuevas dependencias: Tailwind CSS y `@lucide/astro`.

## Capabilities

### New Capabilities
- `portfolio-home`: contenido y secciones de la página principal (hero, stats, about, experiencia, stack, proyectos, fotografía, contacto) y su comportamiento cuando falta una imagen.
- `site-i18n`: rutas por idioma (en/es), selector de idioma, metadatos de idioma y completitud de traducciones.
- `site-presentation`: navegación, diseño responsive, tema visual, accesibilidad, movimiento y metadatos SEO del sitio.

### Modified Capabilities
<!-- Ninguna: el proyecto no tiene specs existentes. -->

## Impact

- `src/pages/index.astro` se reemplaza; se agrega `src/pages/es/index.astro`.
- Código nuevo en `src/components/`, `src/i18n/` (locales `en.json`/`es.json` + utilidad `useTranslations`), `src/data/` y `src/styles/`.
- `astro.config.mjs`: configuración de i18n y Tailwind.
- `package.json`: se agregan `tailwindcss`, `@tailwindcss/vite` y `@lucide/astro` (vía pnpm).
- Sin backend ni servicios externos: el sitio sigue siendo 100% estático.
