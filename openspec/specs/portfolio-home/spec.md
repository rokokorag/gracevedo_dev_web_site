# portfolio-home Specification

## Purpose

Define el contenido y las secciones de la página principal del portfolio, que presenta la trayectoria profesional, el stack, los proyectos y el trabajo fotográfico de Rodrigo Acevedo, y cómo se comporta cuando faltan imágenes.

## Requirements

### Requirement: Página única con secciones en orden fijo
La página principal SHALL presentar, en este orden, las secciones Hero, Stats, About, Experience, Stack, Projects, Photography y Contact. Cada sección MUST tener un identificador de ancla estable para que la navegación pueda enlazarla.

#### Scenario: Orden de secciones
- **WHEN** un visitante carga la página principal en cualquier idioma
- **THEN** ve las secciones Hero, Stats, About, Experience, Stack, Projects, Photography y Contact en ese orden

#### Scenario: Enlace directo a una sección
- **WHEN** un visitante abre la URL de la página con el ancla de una sección (por ejemplo `#projects`)
- **THEN** la página se posiciona en esa sección

### Requirement: Hero con identidad y llamada a la acción
El Hero SHALL mostrar el nombre "Rodrigo Acevedo", el rol de Senior Software Engineer (Mobile & Web), un resumen de una línea de su enfoque en fintech y una llamada a la acción que lleva a la sección Contact.

#### Scenario: Llamada a la acción de contacto
- **WHEN** el visitante activa la llamada a la acción principal del Hero
- **THEN** la página navega a la sección Contact

### Requirement: Indicadores de impacto
La sección Stats SHALL mostrar, en este orden, estos indicadores: 12+ años creando software, 3 plataformas (móvil, web y escritorio) y 6 proyectos independientes y freelance.

#### Scenario: Indicadores visibles
- **WHEN** el visitante llega a la sección Stats
- **THEN** ve los tres indicadores, cada uno con su cifra y una etiqueta descriptiva

### Requirement: Sección About con retrato
La sección About SHALL mostrar una biografía breve (fintech, liderazgo, fotografía e intereses) junto a un espacio para el retrato de Rodrigo.

#### Scenario: Retrato aún no disponible
- **WHEN** no se ha configurado una imagen de retrato
- **THEN** el espacio del retrato muestra un placeholder intencional (monograma) en lugar de una imagen rota o un texto de "imagen pendiente"

#### Scenario: Retrato disponible
- **WHEN** se configura una imagen de retrato
- **THEN** se muestra esa imagen con un texto alternativo descriptivo

### Requirement: Línea de tiempo de experiencia
La sección Experience SHALL listar, del más reciente al más antiguo, el trabajo independiente (Independent Software Engineer, jun 2026 - presente), Uexchange (Senior Mobile Engineer, ene 2026 - may 2026), Vest (Senior Software Engineer, Mobile & Web, mar 2024 - ene 2026) y Nuxiba Technologies (ago 2012 - feb 2024). Cada puesto MUST mostrar empresa, rol, periodo, modalidad/ubicación y sus logros clave.

#### Scenario: Orden cronológico inverso
- **WHEN** el visitante revisa la sección Experience
- **THEN** la entrada independiente aparece primero y Nuxiba Technologies al final

#### Scenario: Puesto en curso
- **WHEN** un puesto no tiene fecha de fin
- **THEN** su periodo termina en "Present" en inglés y "Presente" en español

#### Scenario: Trabajo independiente
- **WHEN** el visitante revisa la entrada independiente
- **THEN** ve el nombre traducido ("Independent" / "Independiente") y los logros sobre Slabs y los sitios para clientes

#### Scenario: Enlace a un proyecto desde un logro
- **WHEN** un logro menciona un proyecto con URL pública (por ejemplo, Slabs: Sliding Puzzle)
- **THEN** el nombre del proyecto es un enlace a su sitio que se abre en una pestaña nueva

#### Scenario: Progresión de roles en Nuxiba
- **WHEN** el visitante revisa la entrada de Nuxiba Technologies
- **THEN** ve la progresión de roles: Software Developer / Senior Software Engineer, Team Coach (2020 - 2024) y Tech Lead (2022 - 2024), cada uno con sus logros

### Requirement: Stack agrupado por categoría
La sección Stack SHALL presentar las tecnologías del CV agrupadas en categorías (Languages, Mobile, Web, Backend & Data, DevOps & Cloud), no como una lista plana. Cada tecnología del CV MUST aparecer en exactamente una categoría.

#### Scenario: Tecnologías agrupadas
- **WHEN** el visitante revisa la sección Stack
- **THEN** ve cada categoría con su nombre y las tecnologías que le corresponden

### Requirement: Proyectos con uno destacado
La sección Projects SHALL mostrar Slabs: Sliding Puzzle como proyecto destacado, con más espacio visual que los demás, además de smiletoo, Raíz Intelligence Lab, RehabSportMed, IP Subnetting y Yoga Homeline. Cada proyecto MUST mostrar nombre, descripción breve y tipo/plataforma (Web, Android, iOS).

#### Scenario: Proyecto destacado
- **WHEN** el visitante revisa la sección Projects
- **THEN** Slabs aparece primero y con una tarjeta más grande que el resto

#### Scenario: Enlaces externos de proyecto
- **WHEN** un proyecto tiene URL pública o enlace a una tienda de apps
- **THEN** la tarjeta ofrece ese enlace, que se abre en una pestaña nueva

#### Scenario: Proyecto sin enlace público
- **WHEN** un proyecto no tiene URL pública
- **THEN** la tarjeta se muestra sin enlace y sin un enlace roto o vacío

#### Scenario: Proyecto legacy
- **WHEN** un proyecto ya no está disponible en su tienda de apps (IP Subnetting, Yoga Homeline)
- **THEN** su tarjeta muestra una insignia "Legacy" y una nota que indica que ya no está disponible en la tienda

#### Scenario: Tecnologías del proyecto
- **WHEN** un proyecto tiene tecnologías configuradas (por ejemplo, Java en IP Subnetting o Swift en Yoga Homeline)
- **THEN** su tarjeta las muestra como etiquetas

### Requirement: Placeholder para imágenes de proyecto
Cada tarjeta de proyecto SHALL mostrar la captura del proyecto si existe; si no, MUST mostrar un placeholder intencional según su plataforma.

#### Scenario: Proyecto sin captura
- **WHEN** un proyecto no tiene captura configurada
- **THEN** su tarjeta muestra un placeholder visual con un ícono de su plataforma y ningún texto de "imagen pendiente"

### Requirement: Sección de fotografía con enlace al portfolio
La sección Photography SHALL mostrar entre 3 y 4 espacios para fotografías y un enlace visible a `https://portfolio.gracevedo.dev/` que se abre en una pestaña nueva.

#### Scenario: Enlace al portfolio fotográfico
- **WHEN** el visitante activa el enlace de la sección Photography
- **THEN** se abre `https://portfolio.gracevedo.dev/` en una pestaña nueva

#### Scenario: Fotografías aún no seleccionadas
- **WHEN** no se han configurado fotografías
- **THEN** cada espacio muestra un placeholder visual intencional en lugar de una imagen rota

### Requirement: Contacto por email sin teléfono
La sección Contact SHALL mostrar la dirección `hi@gracevedo.dev` como enlace `mailto:` y los perfiles profesionales configurados. El sitio MUST NOT publicar el número de teléfono en ninguna parte.

#### Scenario: Contacto por email
- **WHEN** el visitante activa el email en la sección Contact
- **THEN** se abre su cliente de correo con `hi@gracevedo.dev` como destinatario

#### Scenario: Perfil social no configurado
- **WHEN** no hay URL configurada para un perfil (por ejemplo, LinkedIn o GitHub)
- **THEN** ese enlace no se muestra

#### Scenario: Teléfono ausente
- **WHEN** se inspecciona el HTML generado de cualquier página
- **THEN** no contiene el número de teléfono de Rodrigo
