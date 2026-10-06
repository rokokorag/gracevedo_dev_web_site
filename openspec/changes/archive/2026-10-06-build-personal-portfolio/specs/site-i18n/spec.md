# Spec Delta

## Purpose

Permite que el portfolio se lea en inglés (idioma por defecto) y en español, con URLs propias para cada idioma y metadatos que los navegadores y buscadores entienden.

## ADDED Requirements

### Requirement: Rutas por idioma
El sitio SHALL servir la versión en inglés en `/` y la versión en español en `/es`. El inglés MUST ser el idioma por defecto y no lleva prefijo en la URL.

#### Scenario: Visita a la raíz
- **WHEN** un visitante abre `/`
- **THEN** ve la página principal completa en inglés

#### Scenario: Visita a la versión en español
- **WHEN** un visitante abre `/es`
- **THEN** ve la página principal completa en español, con las mismas secciones

#### Scenario: Sin redirección automática
- **WHEN** un visitante con el navegador configurado en español abre `/`
- **THEN** el sitio muestra la versión en inglés sin redirigirlo

### Requirement: Selector de idioma
Cada página SHALL incluir un selector de idioma visible que lleva a la misma página en el otro idioma y que indica el idioma actual.

#### Scenario: Cambio de inglés a español
- **WHEN** el visitante está en `/` y elige ES en el selector
- **THEN** navega a `/es`

#### Scenario: Cambio de español a inglés
- **WHEN** el visitante está en `/es` y elige EN en el selector
- **THEN** navega a `/`

### Requirement: Contenido completamente traducido
Todo el texto visible de la interfaz y del contenido (navegación, títulos, descripciones, logros, etiquetas y textos alternativos) SHALL existir en ambos idiomas. El build MUST fallar si a un idioma le falta una traducción que el otro sí tiene.

#### Scenario: Traducción faltante
- **WHEN** a `es` le falta una clave de traducción presente en `en`
- **THEN** la verificación de tipos o el build falla e indica la clave faltante

#### Scenario: Sin texto mezclado
- **WHEN** el visitante lee `/es`
- **THEN** todo el texto de la interfaz está en español, salvo nombres propios, nombres de tecnologías y títulos de proyectos

### Requirement: Metadatos de idioma
Cada página SHALL declarar su idioma en el atributo `lang` del elemento `<html>` e incluir enlaces `hreflang` alternos a ambas versiones, más un `x-default` que apunta a la versión en inglés.

#### Scenario: Atributo lang
- **WHEN** se inspecciona el HTML de `/es`
- **THEN** el elemento `<html>` tiene `lang="es"`

#### Scenario: Enlaces alternos
- **WHEN** se inspecciona el `<head>` de cualquier versión
- **THEN** contiene enlaces `rel="alternate"` con `hreflang="en"`, `hreflang="es"` y `hreflang="x-default"` que apuntan a las URLs absolutas correspondientes
