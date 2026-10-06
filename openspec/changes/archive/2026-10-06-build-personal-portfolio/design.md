# Design

## Context

El repo es el starter de Astro 7.3 con pnpm: solo existe `src/pages/index.astro`, sin estilos, sin dependencias de UI y sin specs previas. El sitio es 100% estático y se publica en `https://gracevedo.dev`. La motivación y el alcance están en `proposal.md`. El comportamiento esperado está en `specs/portfolio-home`, `specs/site-i18n` y `specs/site-presentation`.

Restricciones del usuario: Astro + pnpm, Tailwind CSS, `@lucide/astro` para íconos, i18n nativo de Astro con locales en `src/i18n/locales/{en,es}.json`, una utilidad `useTranslations(lang)` y páginas delgadas que solo montan `<HomePage lang="..."/>`.

## Goals / Non-Goals

**Goals:**
- Una estructura en la que agregar o editar contenido (un proyecto, un logro, una foto) implique tocar datos o JSON, no componentes.
- Que falte una traducción sea un error de build, no un `undefined` en producción.
- Que el sitio se vea terminado aunque todavía no haya imágenes.
- Cero JavaScript obligatorio: el JS solo mejora la experiencia (cerrar el menú móvil).

**Non-Goals:**
- Formulario de contacto, backend o analítica.
- CMS o content collections: el contenido es poco y estable, y los JSON bastan.
- Selección de las imágenes finales (proyectos, fotos, retrato). Este change solo deja los espacios listos.
- Blog o páginas adicionales.

## Decisions

### 1. Estructura de archivos

```
src/
  pages/
    index.astro            -> <HomePage lang="en" />
    es/index.astro         -> <HomePage lang="es" />
  components/
    pages/HomePage.astro   arma el layout y todas las secciones
    layout/BaseLayout.astro  <html lang>, <head> (SEO, hreflang, fonts), skip link
    layout/Navbar.astro, Footer.astro, LanguageSwitcher.astro
    sections/Hero, Stats, About, Experience, Stack, Projects, Photography, Contact
    ui/ProjectCard, ImageSlot (imagen o placeholder), SectionHeading
  i18n/
    locales/en.json, es.json
    utils.ts               useTranslations(lang) + helpers de URL
  data/
    site.ts                email, URL del portfolio, socials, cvUrl (opcionales)
    experience.ts          empresa, fechas, ubicación, ids de roles
    projects.ts            id, platform, url, storeUrl, image?, featured
    stack.ts               categorías -> tecnologías
    photos.ts              3-4 slots con image?
  styles/global.css        @import "tailwindcss" + @theme con tokens
  assets/                  imágenes futuras (optimizadas por astro:assets)
```

Cada sección recibe `lang` y obtiene `t = useTranslations(lang)`. Las páginas siguen el patrón del usuario al pie de la letra.

### 2. Texto en JSON, datos en `src/data/`

Los JSON contienen **solo texto traducible**, organizado por sección y unido a los datos por `id`:

```
data/projects.ts  { id: "slabs", platform: "android", storeUrl, featured: true }
en.json           projects.items.slabs = { title, description }
```

Lo que no depende del idioma (URLs, fechas, nombres de tecnologías, imágenes) vive una sola vez en `src/data/`. *Alternativa considerada:* poner todo en los JSON. Se descarta porque duplica URLs y fechas en dos archivos que tarde o temprano se desincronizan.

Las fechas se formatean con `Intl.DateTimeFormat(lang, { month: "short", year: "numeric" })`, así que "Jan 2026" / "ene 2026" salen solos.

### 3. Traducciones tipadas contra `en.json`

Se conserva la utilidad del usuario con un cambio de tipado:

```ts
const translations: Record<Locale, typeof en> = { es, en };
```

Si `es.json` no tiene una clave de `en.json`, `astro check` falla. Para eso se agregan `@astrojs/check` y `typescript` como dev dependencies y el script `build` corre `astro check && astro build`. *Limitación:* no detecta arreglos con distinta cantidad de elementos (por ejemplo, un logro de menos). Se mitiga indexando los logros por id de rol en lugar de usar arreglos sueltos donde haga falta, y revisando ambas versiones en las tareas.

### 4. i18n nativo de Astro

```js
site: "https://gracevedo.dev",
i18n: { defaultLocale: "en", locales: ["en", "es"],
        routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false } }
```

`LanguageSwitcher` y los `hreflang` usan `getRelativeLocaleUrl` / `getAbsoluteLocaleUrl` de `astro:i18n`, así que no hay URLs armadas a mano. No hay redirección por `Accept-Language` porque en un sitio estático requeriría middleware en el edge y estorba a quien comparte un enlace.

### 5. Tailwind v4 con tokens en `@theme`

Se instala con `pnpm astro add tailwind` (`@tailwindcss/vite`). Los colores van como tokens en `global.css`:

```
--color-bg       #0a0a0b    fondo
--color-surface  #141416    cards
--color-border   #27272a
--color-fg       #fafafa    texto
--color-muted    #a1a1aa    texto secundario (7.6:1 sobre bg)
--color-accent   #ef4444    rojo: CTAs, foco, resaltados
--color-accent-strong #b91c1c   gradientes, hover
```

El rojo se usa poco: CTAs, foco, marcadores del timeline y glows. El fondo del hero lleva un gradiente radial rojo difuso y una textura de grano en SVG inline. *Alternativa considerada:* un fondo rojo dominante. Se descarta porque cansa y baja la legibilidad.

### 6. Tipografía

Geist (texto y títulos) + Geist Mono (fechas, tags, detalles), auto-hospedadas con la Fonts API de Astro (proveedor fontsource) y `font-display: swap`. *Alternativa:* paquetes `@fontsource-variable/*` importados en CSS, si la Fonts API diera problemas.

### 7. Imágenes opcionales con `ImageSlot`

`ImageSlot` recibe `image?: ImageMetadata`, `alt` y una variante (`project` | `photo` | `portrait`):
- Con imagen: `<Image>` de `astro:assets` (WebP, `loading="lazy"`, tamaños responsivos).
- Sin imagen: un placeholder decorativo con `aria-hidden`. En proyectos es un gradiente oscuro/rojo con el ícono de la plataforma (`Globe` para web, `Smartphone` para Android/iOS; Lucide no incluye logos de marca). En fotos, un bloque con grano y el ícono `Camera`. En el retrato, el monograma "RA" con glow.

Para agregar una imagen después basta con ponerla en `src/assets/` y asignar `image` en `src/data/*.ts`.

### 8. Interacción sin JS obligatorio

- **Menú móvil:** Popover API (`popover` + `popovertarget`), accesible por teclado y sin JS. Un script inline de 3 líneas cierra el popover al elegir un enlace. Sin JS el menú funciona, pero queda abierto tras navegar.
- **Animaciones de entrada:** `animation-timeline: view()` dentro de `@supports` y `@media (prefers-reduced-motion: no-preference)`. Sin soporte, sin preferencia de movimiento o sin JS, el contenido simplemente se ve. Nunca se oculta contenido esperando a un script.
- **Scroll:** `scroll-behavior: smooth` solo con `prefers-reduced-motion: no-preference`, y `scroll-margin-top` en las secciones para compensar la barra fija.

### 9. Proyectos

| id | Plataforma | Enlace |
|---|---|---|
| slabs (destacado) | Android (iOS próximamente) | Google Play + slabs.gracevedo.dev |
| smiletoo | Web | smiletoo.mx |
| raiz-intelligence-lab | Web | raizintelligencelab.com |
| rehabsportmed | Web | rehabsportmed.com.mx |
| ip-subnetting | Android | ninguno por ahora |
| yoga-homeline | iOS | ninguno por ahora |

Los tags de tecnología por proyecto son opcionales (`tags?: string[]`) y se muestran solo si existen.

### 10. Stack agrupado

- **Languages:** JavaScript, Python, Dart, Swift, Java, C/C++, PHP, .NET
- **Mobile:** Flutter, Fastlane
- **Web:** ReactJS, NextJS, RemixJS, AstroJS, ViteJS
- **Backend & Data:** ExpressJS, GraphQL, Firebase, SQL Server, MongoDB, MySQL
- **DevOps & Cloud:** Docker, Jenkins, LaunchDarkly, Cloudflare, Vercel, Amazon EC2

## Risks / Trade-offs

- [El placeholder se queda en producción por meses] → Está diseñado para verse intencional, no como algo "pendiente". Además, la lista de imágenes pendientes queda en Open Questions.
- [`astro check` no detecta arreglos de distinta longitud entre idiomas] → Logros indexados por clave donde se pueda, más una revisión visual de `/` y `/es` en las tareas.
- [`animation-timeline` no existe en todos los navegadores] → Es una mejora progresiva: sin soporte, el contenido es estático y visible.
- [Exponer `hi@gracevedo.dev` en texto plano atrae spam] → Se acepta. El alias es dedicado y se puede filtrar en el reenvío.
- [Popover sin JS no se cierra al navegar] → Se acepta como degradación menor.

## Open Questions

- URLs de LinkedIn y GitHub: los enlaces aparecen solos cuando se agregan en `src/data/site.ts`.
- Botón "Download CV": se muestra solo si `cvUrl` está definido. Falta decidir si se publica el PDF y en qué idiomas.
- Imágenes pendientes: capturas de los 6 proyectos, 3-4 fotografías y el retrato de About.
- Tags de tecnología de cada side-project (por ejemplo, el stack de Slabs).
- Imagen Open Graph para compartir: se puede generar una estática más adelante; este change no la requiere.
