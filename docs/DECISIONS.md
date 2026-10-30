# Registro de decisiones de arquitectura

Este archivo registra las decisiones técnicas del proyecto **Portfolio Facundo Caceres** en formato ADR (*Architecture Decision Record*).

Cada decisión indica el contexto, lo que se decidió y sus consecuencias. Las decisiones no se borran: si una cambia, se agrega una nueva que la reemplaza y la anterior se marca como `Reemplazada por ADR-XXX`.

## Cómo agregar una decisión

1. Copiar la plantilla del final con el número siguiente.
2. Completar contexto, decisión y consecuencias.
3. Si reemplaza una decisión anterior, actualizar el estado de esa decisión.

---

## ADR-001: Stack base: React + TypeScript + Vite

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** El proyecto se inició con el template oficial de Vite para React y TypeScript. El sitio es una SPA chica, sin necesidad de renderizado en servidor.

**Decisión.** Mantener React 19, TypeScript y Vite. No agregar dependencias de runtime fuera de `react` y `react-dom`.

**Consecuencias.**
- El build genera archivos estáticos (`dist/`) que se pueden publicar en cualquier hosting estático (GitHub Pages, Netlify, Vercel).
- TypeScript permite expresar los contratos entre capas como interfaces.
- Menos dependencias implica menos mantenimiento y un bundle más chico.

---

## ADR-002: Clean Architecture con cuatro capas y un composition root

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** Se pidió que el proyecto use Clean Architecture. Un portfolio es simple, pero separar el contenido y las reglas de la interfaz permite cambiar la fuente de datos o el diseño sin reescribir todo.

**Decisión.** Organizar `src/` en capas, con dependencias que apuntan solo hacia adentro:

| Capa | Carpeta | Responsabilidad | Puede importar |
|---|---|---|---|
| Dominio | `src/domain` | Entidades (`Profile`, `Project`, `Skill`), reglas puras y puertos (interfaces de repositorios) | Nada |
| Aplicación | `src/application` | Casos de uso que orquestan el dominio | `domain` |
| Infraestructura | `src/infrastructure` | Implementaciones concretas de los repositorios y datos | `domain` |
| Presentación | `src/presentation` | Componentes React, hooks y estilos | `domain`, `application` |
| Composition root | `src/composition` | Crea los repositorios y casos de uso y los conecta | Todas |

`src/main.tsx` es el punto de entrada: pide el contenedor a `composition` y se lo entrega a la presentación.

**Consecuencias.**
- Dominio y aplicación no conocen React ni el origen de los datos; se pueden probar con repositorios falsos.
- Hay más archivos que en un enfoque "todo en componentes". Es un costo aceptado a cambio de límites claros.
- Infraestructura no importa aplicación: implementa los puertos que define el dominio.

---

## ADR-003: Contenido en un archivo estático detrás de repositorios

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** El contenido (perfil, proyectos, habilidades) cambia poco y no justifica un backend o un CMS por ahora.

**Decisión.** Guardar todo el contenido en `src/infrastructure/data/portfolioContent.ts`. Los repositorios `Static*Repository` lo exponen a través de las interfaces del dominio.

**Consecuencias.**
- Para actualizar el portfolio se edita un solo archivo; no hace falta tocar componentes.
- El contenido es tipado: TypeScript avisa si falta un campo.
- Para pasar a una API o a un CMS se crea otro repositorio (por ejemplo `HttpProjectRepository`) y se cambia en `src/composition/container.ts`. Ninguna otra capa cambia.

---

## ADR-004: Repositorios y casos de uso asíncronos

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** Los datos hoy están en memoria, pero una fuente futura (API, archivo remoto) será asíncrona.

**Decisión.** Todos los métodos de repositorio y todos los casos de uso devuelven `Promise`. La presentación los consume con el hook `useAsync`, que expone los estados `loading`, `success` y `error`.

**Consecuencias.**
- Cambiar a una fuente remota no cambia la firma de ningún contrato.
- La interfaz ya maneja estados de carga y error, aunque con datos estáticos la carga es instantánea.

---

## ADR-005: Casos de uso como clases con un método `execute`

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** Los casos de uso necesitan recibir sus dependencias (repositorios). La configuración de TypeScript tiene `erasableSyntaxOnly`, que no permite propiedades de parámetro en el constructor (`constructor(private repo: X)`).

**Decisión.** Cada caso de uso es una clase con el repositorio como campo privado asignado en el constructor y un único método público `execute`. La interfaz `PortfolioUseCases` agrupa todos los casos de uso que la presentación puede usar.

Casos de uso actuales:
- `GetProfile`: datos personales.
- `ListProjects`: proyectos ordenados (destacados primero, luego por año descendente), con filtro opcional por tecnología.
- `ListProjectTechnologies`: tecnologías únicas usadas en los proyectos, para armar los filtros.
- `ListSkillsByCategory`: habilidades agrupadas por categoría.

**Consecuencias.**
- La inyección de dependencias es explícita y no requiere librerías.
- Las reglas de orden, filtrado y agrupación viven en dominio y aplicación, no en los componentes.

---

## ADR-006: Inyección de casos de uso con React Context

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** Los componentes necesitan acceder a los casos de uso sin importar la infraestructura ni el composition root.

**Decisión.** `src/presentation/context/UseCasesContext.ts` define un contexto tipado con `PortfolioUseCases` y el hook `useUseCases()`. `main.tsx` provee el contenedor creado por `createContainer()`.

**Consecuencias.**
- La presentación depende solo de la interfaz `PortfolioUseCases`, no de las implementaciones.
- En tests se puede proveer un contenedor con casos de uso falsos.
- Usar el hook fuera del provider lanza un error explícito.

---

## ADR-007: La regla de dependencias se verifica con ESLint

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** Una arquitectura en capas se degrada si nada impide importar, por ejemplo, infraestructura desde un componente.

**Decisión.** `eslint.config.js` usa `no-restricted-imports` por carpeta para prohibir los imports que rompen la regla de dependencias (ver tabla de ADR-002). Dominio, aplicación e infraestructura tampoco pueden importar React.

**Consecuencias.**
- `npm run lint` falla si se viola la arquitectura, con un mensaje que indica la capa y la dependencia prohibida.
- No se agregó un plugin extra (como `eslint-plugin-boundaries`); la regla nativa alcanza para este tamaño de proyecto.

---

## ADR-008: Página única con secciones y navegación por anclas

- **Fecha:** 2026-10-30
- **Estado:** Aceptada (secciones actualizadas por ADR-011)

**Contexto.** El portfolio tiene pocas secciones y se recorre de arriba hacia abajo.

**Decisión.** Una sola página con las secciones Inicio, Sobre mí, Habilidades, Proyectos y Contacto. El header navega con anclas (`#proyectos`, etc.). No se usa router.

**Consecuencias.**
- Sin dependencias de routing y sin configuración especial de hosting para rutas.
- Si en el futuro cada proyecto necesita su propia página, habrá que agregar un router (nueva decisión).

---

## ADR-009: Estilos con CSS plano y variables

- **Fecha:** 2026-10-30
- **Estado:** Aceptada (el modo claro/oscuro fue reemplazado por ADR-013)

**Contexto.** El diseño es simple y no justifica un framework de CSS.

**Decisión.** Un único archivo `src/presentation/styles/global.css` con variables CSS (colores, radios, ancho máximo) y clases con nomenclatura tipo BEM (`bloque__elemento--modificador`). El modo oscuro sigue la preferencia del sistema (`prefers-color-scheme`).

**Consecuencias.**
- Cambiar la paleta es editar las variables de `:root`.
- Si el número de componentes crece mucho, conviene pasar a CSS Modules por componente.

---

## ADR-010: Identidad del sitio

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** Se pidió que el sitio se llame "Portfolio Facundo Caceres".

**Decisión.** El nombre se define en `SITE_NAME` (`src/presentation/siteConfig.ts`) y se usa en el header y el footer. También está en el `<title>` de `index.html` y en el nombre del paquete (`portfolio-facundo-caceres`). La interfaz está en español (`lang="es"`).

**Consecuencias.**
- Cambiar el nombre visible requiere editar `siteConfig.ts` e `index.html`.

---

## ADR-011: Estructura de la página con carruseles

- **Fecha:** 2026-10-30
- **Estado:** Aceptada. Reemplaza las secciones de ADR-008 y la lista de casos de uso de ADR-005.

**Contexto.** Se definió el diseño de la página: nombre en grande, subtítulo "Ingeniero en Computación" y un texto "sobre mí" arriba; debajo, carruseles de Proyectos, Estudios y Experiencia; al final, Contacto. Todo texto de relleno debe ser lorem ipsum, sin contenido inventado.

**Decisión.**
- Secciones: Inicio (hero de pantalla completa con el "sobre mí"), Proyectos, Estudios, Experiencia y Contacto. Se eliminan Sobre mí (pasa al hero) y Habilidades.
- `Project`, `Education` y `Experience` son hoy alias de `PortfolioEntry` (`id`, `title`, `summary`, `description`, `image`). Se mantienen como tipos separados para que puedan crecer por separado.
- "Ver más" no abre un modal: el carrusel se corre a la izquierda y aparece un panel de detalle a la derecha. En pantallas de 900 px o menos no hay lugar al costado, así que el panel se despliega debajo. Es una grilla de dos pistas cuyo tamaño (`grid-template-columns` o `grid-template-rows`) se anima con CSS. La altura de las tarjetas no cambia al expandir, para que la página no salte.
- El panel muestra siempre la tarjeta activa: si se mueve el carrusel con el panel abierto, el detalle la sigue.
- Al expandir, un ancho de `min(100vw - 4rem, 1600px)` (más ancho que el contenido del resto de la página, para no dejar un gran margen vacío a la derecha) se reparte 4/6 para la foto y 2/6 para el panel de texto. La foto tiene un máximo de 760 px de ancho. La foto activa se agranda, se centra en su parte y pierde el texto superpuesto; los controles se centran debajo de ella. Las tarjetas laterales siguen visibles detrás, más chicas y sin texto: asoman hacia la izquierda y se desvanecen antes de llegar al panel. El título y la descripción breve se muestran solo en el panel, arriba de la información adicional. Tocar la foto agrandada, la ✕ o Escape la achica.

---

## ADR-012: Items de los carruseles en un archivo editable a mano

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** Agregar un item tiene que ser simple: ir a un archivo, copiar un bloque y cambiar textos, sin `id`, sin imports de imágenes y sin conocer las entidades del dominio.

**Decisión.**
- `src/content/carruseles.ts` contiene tres listas (`proyectos`, `estudios`, `experiencia`) de objetos con campos en español: `titulo`, `resumen`, `detalle` (opcional, texto multilínea donde una línea en blanco separa párrafos) e `imagen` (opcional: nombre de un archivo en `public/imagenes/` o una URL).
- `src/infrastructure/data/carouselItems.ts` (`toPortfolioEntries`) los convierte en `PortfolioEntry`. Genera el `id` a partir de la posición, divide el detalle en párrafos y resuelve la ruta de la imagen con `import.meta.env.BASE_URL`, así funciona aunque el sitio se publique en una subcarpeta.
- `src/content` es una capa más en ESLint: no puede importar ninguna otra capa ni React. Solo la lee infraestructura.

**Consecuencias.**
- El `id` depende del orden: si se reordenan los items, cambia. Hoy no se usa para nada persistente.
- Las imágenes en `public/` no pasan por el bundler (no se optimizan ni llevan hash), a cambio de no necesitar imports.

---

## ADR-013: Tema visual futurista, oscuro, en celeste y rosa

- **Fecha:** 2026-10-30
- **Estado:** Aceptada. Reemplaza el modo claro/oscuro automático de ADR-009.

**Contexto.** Se pidió un aspecto más futurista, con colores vibrantes, preferentemente celeste y rosa.

**Decisión.**
- Un solo tema, oscuro (`color-scheme: dark`); ya no se sigue `prefers-color-scheme`. Los colores de neón necesitan fondo oscuro para destacar.
- Paleta en `:root`: `--cyan` (#00e5ff), `--pink` (#ff3ec9), `--gradient` (celeste → rosa) y sombras de brillo `--glow-cyan` y `--glow-pink`.
- Fondo con luces difusas (gradientes radiales) y una grilla fina que se desvanece hacia abajo (`body::before`). El fondo se define en `<html>` y no en `<body>`: si estuviera en `<body>`, se pintaría encima de los elementos con `z-index: -1` (grilla y estrellas) y los taparía.
- Cielo estrellado (`Starfield`): un `<canvas>` fijo detrás del contenido, sin dependencias. Las estrellas son blancas, celestes y rosas y titilan; las más cercanas se desplazan un poco con el scroll (parallax) y cada 6 a 14 s cruza una estrella fugaz. La cantidad depende del área de la pantalla (1 cada 5000 px²) y dibujar un cuadro cuesta menos de 1 ms. Con `prefers-reduced-motion` se dibuja una sola vez, quieto. Los ajustes son constantes al principio de `Starfield.tsx`.
- Texto con degradado en el nombre, la marca del header y el título del panel de detalle. Fuente monoespaciada (del sistema, `--font-mono`) para el menú, el subtítulo, los botones y el footer.
- Bordes y halos de neón en la tarjeta principal del carrusel, en los botones y en los indicadores. La imagen de ejemplo usa la misma paleta.
- No se agregan fuentes externas: se usan fuentes del sistema, para no depender de otro servicio ni sumar peso.

**Consecuencias.**
- Cambiar la paleta es editar unas pocas variables de `:root`.
- Para usar una tipografía más "tecnológica" (por ejemplo Orbitron o Space Grotesk) habría que incluirla en el proyecto o cargarla de un servicio externo; sería una decisión nueva.

---

## ADR-014: Sitio bilingüe (español / inglés) sin librerías

- **Fecha:** 2026-10-30
- **Estado:** Aceptada. Amplía ADR-012 (el perfil también pasa a `src/content/`).

**Contexto.** Se pidió un selector para cambiar entre inglés y español, con el idioma de la computadora como valor por defecto, y que cargar contenido siga siendo simple.

**Decisión.**
- **Dominio:** `Language` (`'es' | 'en'`). Los repositorios y casos de uso reciben el idioma: `getProfile(language)`, `getAll(language)`, `execute(language)`. El dominio no sabe de traducciones; solo pide el contenido en un idioma.
- **Contenido:** cada texto de `src/content/` es un `Texto`: un string (igual en ambos idiomas) o `{ es, en? }`. Si falta `en`, se usa `es`. Así no hace falta duplicar lo que no cambia (nombre, email, URLs) y se puede traducir de a poco. Los datos personales se movieron a `src/content/perfil.ts`.
- **Infraestructura:** `localize()` elige la versión del texto. `StaticListRepository` y `StaticProfileRepository` reciben una función `(language) => datos` en lugar de datos fijos.
- **Presentación:** `LanguageProvider` guarda el idioma actual y expone `useLanguage()` con `language`, `setLanguage` y `t` (textos fijos de la interfaz, en `i18n/translations.ts`). Actualiza `<html lang>`. Las funciones de carga de `App` dependen del idioma, así que al cambiarlo `useAsync` vuelve a pedir el contenido.
- **Idioma inicial:** el elegido antes con el selector (en `localStorage`, clave `idioma`); si no hay, el primero de `navigator.languages` que el sitio soporte; si ninguno, inglés.
- **Selector:** `LanguageSwitch`, un grupo de dos botones ES | EN con `aria-pressed`, en el header. En el teléfono el menú usa una fuente más compacta para que el menú y el selector entren en una línea; si igual no entran, el menú se desplaza de costado.
- No se agregó una librería de i18n (react-i18next, etc.): con dos idiomas y pocos textos fijos alcanza con un objeto tipado.

**Consecuencias.**
- TypeScript avisa si a `translations` le falta un texto en algún idioma.
- No hay URLs por idioma (`/en/...`): los buscadores indexan el idioma inicial. Si hiciera falta SEO en inglés, habría que agregar rutas o prerenderizado (nueva decisión).
- Agregar un tercer idioma: sumarlo a `LANGUAGES`, a `translations` y al tipo `Texto`.

---

## ADR-015: Varias imágenes y videos por item del carrusel

- **Fecha:** 2026-10-30
- **Estado:** Aceptada. Reemplaza el campo `imagen` de ADR-012 por `medios`.

**Contexto.** Se pidió que cada item pueda tener varias imágenes o videos: sin seleccionar se ve solo el primero; con "Ver más" van rotando (cada imagen 5 segundos) y los videos se reproducen.

**Decisión.**
- **Contenido:** `medios: ['foto.jpg', 'demo.mp4', ...]` en `src/content/carruseles.ts`. Un archivo de `public/imagenes/` o una URL completa.
- **Dominio:** entidad `Media` (`type: 'image' | 'video'`, `src`). `PortfolioEntry.media` reemplaza a `image`. Infraestructura decide el tipo por la extensión (`.mp4`, `.webm`, `.ogv`, `.ogg`, `.mov`, `.m4v` → video).
- **Presentación:** componente `CardMedia`.
  - Sin reproducir: monta solo el primer medio. Si es un video, se carga con `#t=0.1` para que se vea su primer cuadro y queda en pausa.
  - Reproduciendo (tarjeta activa y expandida): monta todos apilados y muestra uno a la vez, con fundido. Cada imagen dura `IMAGE_DURATION_MS` (5000); cada video se reproduce desde el principio hasta el final y después pasa al siguiente. Si el item tiene un solo video, se repite.
  - Los videos arrancan sin sonido (los navegadores bloquean la reproducción automática con sonido) y aparece un botón para activarlo.
  - Barras de progreso arriba de la foto, una por medio, cuando hay más de uno.
  - El carrusel monta `CardMedia` con un `key` distinto al expandir y al contraer: al volver a abrir, la secuencia empieza desde el primero y no queda ningún video sonando al cerrar.
- Se probó con un video de ejemplo público (MDN `flower.webm`) que no quedó en el contenido.

**Consecuencias.**
- No se soportan videos de YouTube/Vimeo (necesitarían un `<iframe>` y su API para saber cuándo terminan); serían una decisión nueva.
- Los videos pesados conviene comprimirlos (por ejemplo a 720p): se descargan cuando la tarjeta se expande.

---

## ADR-016: Botones de enlace y descarga en el detalle

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

**Contexto.** Se pidió que, al tocar "Ver más", algunos items muestren botones para abrir un enlace, para descargar algo, ninguno o los dos.

**Decisión.**
- **Contenido:** `botones: [{ enlace: '...' }, { descarga: 'archivo.pdf' }]` en `src/content/carruseles.ts`, con `texto` opcional (`Texto`, traducible). El tipo `Boton` es una unión: TypeScript no deja poner `enlace` y `descarga` en el mismo botón.
- **Dominio:** entidad `EntryAction` (`kind: 'link' | 'download'`, `url`, `label?`). `PortfolioEntry.actions` es la lista, vacía si no hay botones.
- **Infraestructura:** una descarga con nombre de archivo se busca en `public/archivos/`; las URL completas se usan tal cual.
- **Presentación:** el panel de detalle muestra los botones debajo del texto. Enlace: botón con degradado, ícono de "abrir afuera", `target="_blank"` con `rel="noopener noreferrer"` y un texto oculto para lectores de pantalla que avisa que se abre en una pestaña nueva. Descarga: botón de neón con ícono de flecha y atributo `download`. Sin `texto`, dicen "Abrir enlace" / "Descargar" según el idioma.

**Consecuencias.**
- El atributo `download` solo fuerza la descarga para archivos del mismo sitio. Si `descarga` apunta a otro dominio, el navegador puede abrir el archivo en lugar de descargarlo.
- Los archivos de `public/archivos/` se publican tal cual con el sitio: no poner ahí nada privado.
- Como las tres son listas de solo lectura, comparten el puerto genérico `ListRepository<T>`, la implementación `StaticListRepository<T>` y el caso de uso `ListCollection<T>`. `ProjectRepository`, `EducationRepository` y `ExperienceRepository` son alias de `ListRepository<T>`.
- Un único componente `Carousel` se usa en las tres secciones mediante `CarouselSection`. Es circular (vuelta infinita): la tarjeta activa queda al frente, más grande, y las vecinas detrás, más chicas y apagadas. Se navega con flechas, puntos, swipe, clic en una tarjeta lateral o teclado. No usa dependencias: cada tarjeta visible se identifica por su posición absoluta (`key`), así React conserva el elemento y anima el movimiento con CSS.

**Consecuencias.**
- Se quitan el filtro por tecnología y el orden por destacados/año; los elementos se muestran en el orden del archivo de contenido.
- Si una colección necesita reglas propias (filtros, orden), se le crea su caso de uso específico en lugar de `ListCollection`.

---

## Plantilla

```markdown
## ADR-XXX: Título corto

- **Fecha:** AAAA-MM-DD
- **Estado:** Propuesta | Aceptada | Reemplazada por ADR-XXX

**Contexto.** Qué problema o necesidad motiva la decisión.

**Decisión.** Qué se decidió.

**Consecuencias.** Qué se gana, qué se pierde y qué queda pendiente.
```
