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
- **Estado:** Aceptada

**Contexto.** El portfolio tiene pocas secciones y se recorre de arriba hacia abajo.

**Decisión.** Una sola página con las secciones Inicio, Sobre mí, Habilidades, Proyectos y Contacto. El header navega con anclas (`#proyectos`, etc.). No se usa router.

**Consecuencias.**
- Sin dependencias de routing y sin configuración especial de hosting para rutas.
- Si en el futuro cada proyecto necesita su propia página, habrá que agregar un router (nueva decisión).

---

## ADR-009: Estilos con CSS plano y variables

- **Fecha:** 2026-10-30
- **Estado:** Aceptada

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

## Plantilla

```markdown
## ADR-XXX: Título corto

- **Fecha:** AAAA-MM-DD
- **Estado:** Propuesta | Aceptada | Reemplazada por ADR-XXX

**Contexto.** Qué problema o necesidad motiva la decisión.

**Decisión.** Qué se decidió.

**Consecuencias.** Qué se gana, qué se pierde y qué queda pendiente.
```
