# Tasks

## 1. Setup y dependencias

- [x] 1.1 Instalar Tailwind con `pnpm astro add tailwind` y verificar que `@tailwindcss/vite` aparece en `astro.config.mjs` y que existe `src/styles/global.css` con `@import "tailwindcss"`
- [x] 1.2 Instalar `@lucide/astro` y, como dev dependencies, `@astrojs/check` y `typescript`; verificar con `pnpm list` que los cuatro paquetes están instalados
- [x] 1.3 Configurar en `astro.config.mjs` `site: "https://gracevedo.dev"` e `i18n` (`defaultLocale: "en"`, `locales: ["en","es"]`, `prefixDefaultLocale: false`) y cambiar el script `build` a `astro check && astro build`; verificar que `pnpm build` termina sin errores
- [x] 1.4 Configurar Geist y Geist Mono con la Fonts API de Astro (o `@fontsource-variable/*` como respaldo) y verificar en `pnpm dev` que el texto se renderiza con Geist

## 2. Tokens de diseño y layout base

- [x] 2.1 Definir en `src/styles/global.css` los tokens `@theme` (bg, surface, border, fg, muted, accent, accent-strong, fuentes), estilos base de `body`, `scroll-margin-top` en secciones, smooth scroll y animaciones de entrada condicionadas a `prefers-reduced-motion: no-preference` y `@supports (animation-timeline: view())`; verificar que con movimiento reducido emulado en DevTools no hay animaciones
- [x] 2.2 Crear `src/components/layout/BaseLayout.astro` con `<html lang={lang}>`, enlace "skip to content", `<main id="main">` y slot; verificar que el primer Tab enfoca el skip link

## 3. i18n

- [x] 3.1 Crear `src/i18n/locales/en.json` con la estructura completa (meta, nav, hero, stats, about, experience, stack, projects, photography, contact, footer) y el texto en inglés tomado del CV
- [x] 3.2 Crear `src/i18n/locales/es.json` con las mismas claves traducidas al español
- [x] 3.3 Crear `src/i18n/utils.ts` con `Locale`, `useTranslations(lang)` tipado como `Record<Locale, typeof en>` y helpers de URL basados en `astro:i18n`; verificar que borrar temporalmente una clave de `es.json` hace fallar `pnpm astro check`
- [x] 3.4 Agregar a `BaseLayout` título, meta descripción, canónica, `hreflang` (en, es, x-default) y Open Graph/Twitter por idioma; verificar en `dist/es/index.html` `lang="es"`, `og:locale` `es_MX` y canónica `https://gracevedo.dev/es/`
- [x] 3.5 Crear `src/components/layout/LanguageSwitcher.astro` (EN | ES, idioma actual marcado con `aria-current`); verificar que lleva de `/` a `/es` y de vuelta

## 4. Datos

- [x] 4.1 Crear `src/data/site.ts` (email `hi@gracevedo.dev`, URL del portfolio de fotografía, socials y `cvUrl` opcionales) y verificar que no contiene número de teléfono
- [x] 4.2 Crear `src/data/experience.ts` (Uexchange, Vest, Nuxiba con roles, fechas y ubicaciones del CV) y `src/data/stack.ts` (cinco categorías del design); verificar que cada tecnología del CV aparece exactamente una vez
- [x] 4.3 Crear `src/data/projects.ts` (Slabs destacado + 5 proyectos, `image?` y `tags?` opcionales) y `src/data/photos.ts` (4 slots vacíos); verificar con `pnpm astro check` que los ids coinciden con las claves de los JSON

## 5. Componentes UI

- [x] 5.1 Crear `src/components/ui/ImageSlot.astro` con variantes `project`, `photo` y `portrait`: usa `<Image>` si hay imagen y si no, un placeholder decorativo con `aria-hidden`; verificar visualmente las tres variantes sin imagen
- [x] 5.2 Crear `src/components/ui/SectionHeading.astro` y `src/components/ui/ProjectCard.astro` (variante destacada, enlaces con `target="_blank" rel="noopener noreferrer"` solo si existen, tags opcionales); verificar que una tarjeta sin URL no muestra enlace

## 6. Navegación

- [x] 6.1 Crear `src/components/layout/Navbar.astro` fija con enlaces a secciones, `LanguageSwitcher` y menú móvil con Popover API + script inline que lo cierra al elegir un enlace; verificar con 375px que el menú abre, navega y se cierra, y que funciona con teclado
- [x] 6.2 Crear `src/components/layout/Footer.astro` (copyright, email, enlace a fotografía); verificar que se renderiza en ambos idiomas

## 7. Secciones

- [x] 7.1 Crear `Hero.astro` (nombre, rol, tagline, CTA a `#contact`, CV opcional, glow rojo y grano) y `Stats.astro` (12+ años, +70%, 5 ingenieros); verificar que el CTA lleva a Contact
- [x] 7.2 Crear `About.astro` con bio y `ImageSlot` portrait; verificar que se muestra el monograma "RA" sin imagen
- [x] 7.3 Crear `Experience.astro` como timeline en orden cronológico inverso con la progresión de roles de Nuxiba y fechas formateadas con `Intl.DateTimeFormat`; verificar "Jan 2026" en `/` y "ene 2026" en `/es`
- [x] 7.4 Crear `Stack.astro` en bento grid por categoría con íconos Lucide decorativos; verificar las cinco categorías
- [x] 7.5 Crear `Projects.astro` con Slabs destacado (Google Play + sitio, iOS "coming soon") y los otros cinco; verificar que Slabs aparece primero y más grande
- [x] 7.6 Crear `Photography.astro` con 4 `ImageSlot` photo y enlace a `https://portfolio.gracevedo.dev/` en pestaña nueva; verificar el enlace
- [x] 7.7 Crear `Contact.astro` con `mailto:hi@gracevedo.dev` y socials que solo se muestran si están configurados; verificar que el enlace abre el cliente de correo

## 8. Páginas

- [x] 8.1 Crear `src/components/pages/HomePage.astro` que recibe `lang` y arma BaseLayout, Navbar, las ocho secciones en orden y Footer
- [x] 8.2 Reemplazar `src/pages/index.astro` por `<HomePage lang="en" />` y crear `src/pages/es/index.astro` con `<HomePage lang="es" />`; verificar que `pnpm build` genera `dist/index.html` y `dist/es/index.html`

## 9. Verificación integral

- [x] 9.1 Ejecutar `pnpm build` y verificar que no hay errores de tipos ni de build
- [x] 9.2 Buscar con `grep -r "4833" dist/` y verificar que el teléfono no aparece en ningún HTML generado
- [x] 9.3 Revisar `/` y `/es` con `pnpm preview` a 320px, 768px y 1440px: sin scroll horizontal, sin texto en el idioma equivocado, sin imágenes rotas
- [x] 9.4 Recorrer la página con teclado y auditar con Lighthouse (Accessibility y SEO ≥ 95) en ambos idiomas; corregir hallazgos de contraste o foco
- [x] 9.5 Desactivar JavaScript y activar `prefers-reduced-motion` en DevTools; verificar que todo el contenido es visible y no hay animaciones
