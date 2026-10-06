# site-presentation Specification

## Purpose

Define la presentación del portfolio: navegación, tema visual oscuro con acento rojo, adaptación a distintos tamaños de pantalla, accesibilidad, movimiento y metadatos para buscadores y redes sociales.

## Requirements

### Requirement: Navegación entre secciones
El sitio SHALL mostrar una barra de navegación fija con enlaces a las secciones principales (About, Experience, Stack, Projects, Contact) y el selector de idioma. En pantallas pequeñas, los enlaces MUST estar disponibles en un menú desplegable operable con teclado.

#### Scenario: Navegación en escritorio
- **WHEN** el visitante activa un enlace de la barra en una pantalla ancha
- **THEN** la página se desplaza a esa sección y la barra sigue visible

#### Scenario: Menú en móvil
- **WHEN** el visitante abre el menú en una pantalla de 375px de ancho y elige una sección
- **THEN** la página navega a esa sección y el menú se cierra

### Requirement: Tema oscuro con acento rojo
El sitio SHALL usar un fondo casi negro, superficies en grises oscuros y el rojo como color de acento para llamadas a la acción, resaltados y estados de foco. El texto MUST cumplir contraste WCAG 2.1 AA contra su fondo.

#### Scenario: Contraste de texto
- **WHEN** se audita el contraste de texto en cualquier sección
- **THEN** el texto normal alcanza al menos 4.5:1 y el texto grande al menos 3:1

### Requirement: Diseño responsive
El sitio SHALL ser utilizable sin desplazamiento horizontal desde 320px de ancho hasta pantallas de escritorio, y reorganizar las cuadrículas (stack, proyectos, fotos) en una sola columna en móvil.

#### Scenario: Pantalla pequeña
- **WHEN** la página se muestra con 320px de ancho
- **THEN** no hay desplazamiento horizontal y todo el contenido es legible

### Requirement: Accesibilidad por teclado y lector de pantalla
Todos los elementos interactivos SHALL ser alcanzables y operables con teclado y mostrar un indicador de foco visible. Los íconos decorativos MUST estar ocultos para lectores de pantalla, y la página MUST incluir un enlace para saltar al contenido principal.

#### Scenario: Navegación con teclado
- **WHEN** el visitante recorre la página con Tab
- **THEN** cada enlace y botón recibe el foco en orden lógico con un indicador visible

#### Scenario: Saltar al contenido
- **WHEN** el visitante presiona Tab al cargar la página
- **THEN** el primer elemento enfocable es un enlace para saltar al contenido principal

### Requirement: Movimiento respetuoso
Las animaciones de entrada y transición SHALL desactivarse o reducirse cuando el visitante tiene activada la preferencia `prefers-reduced-motion: reduce`. El contenido MUST ser visible aunque JavaScript esté desactivado.

#### Scenario: Movimiento reducido
- **WHEN** el visitante tiene activado `prefers-reduced-motion: reduce`
- **THEN** las secciones aparecen sin animaciones de desplazamiento ni transiciones decorativas

#### Scenario: Sin JavaScript
- **WHEN** JavaScript está desactivado
- **THEN** todo el contenido de todas las secciones es visible

### Requirement: Metadatos SEO y para compartir
Cada versión de idioma SHALL incluir título, meta descripción en su idioma, URL canónica y metadatos Open Graph y Twitter Card para mostrar una vista previa al compartir el enlace.

#### Scenario: Compartir el enlace
- **WHEN** se inspecciona el `<head>` de `/es`
- **THEN** contiene título y descripción en español, `og:locale` `es_MX`, y la canónica `https://gracevedo.dev/es/`
