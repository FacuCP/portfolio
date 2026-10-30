# Portfolio Facundo Caceres

Sitio web personal para mostrar mis proyectos, habilidades y datos de contacto.

Está hecho con React, TypeScript y Vite, y organizado con Clean Architecture. Las decisiones técnicas están documentadas en [docs/DECISIONS.md](docs/DECISIONS.md).

## Requisitos

- Node.js 20 o superior
- npm

## Comandos

```bash
npm install       # instala dependencias
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # verifica tipos y genera el sitio en dist/
npm run preview   # sirve localmente el build de dist/
npm run lint      # ESLint, incluida la verificación de capas
```

## Qué muestra la página

Es una página única con estas secciones, accesibles desde el menú superior:

| Sección | Contenido |
|---|---|
| Inicio | Nombre, rol, frase de presentación y accesos a Proyectos y Contacto |
| Sobre mí | Presentación y ubicación |
| Habilidades | Tecnologías agrupadas por categoría |
| Proyectos | Tarjetas de proyectos con filtro por tecnología. Los destacados aparecen primero y después los más recientes |
| Contacto | Email y redes sociales |

El modo claro u oscuro sigue la configuración del sistema operativo.

## Cómo editar el contenido

Todo el contenido está en un solo archivo:

```
src/infrastructure/data/portfolioContent.ts
```

- **`profile`**: nombre, rol, presentación, ubicación, email y redes.
- **`projects`**: lista de proyectos. Cada uno tiene `id` (único), `title`, `summary`, `technologies`, `year`, `featured` y, opcionalmente, `repositoryUrl` y `demoUrl`.
- **`skills`**: lista de habilidades con `name` y `category`. Las categorías se muestran en el orden en que aparecen por primera vez.

Los filtros de la sección Proyectos se generan solos a partir de las tecnologías de los proyectos.

> Los valores marcados con `TODO` son de ejemplo (email, redes, proyectos de muestra) y hay que reemplazarlos antes de publicar.

## Arquitectura

El código se divide en capas. Cada capa solo puede depender de las capas más internas:

```
src/
├── domain/              Entidades, reglas puras e interfaces de repositorios
│   ├── entities/        Profile, Project, Skill
│   └── repositories/    ProfileRepository, ProjectRepository, SkillRepository
├── application/         Casos de uso
│   ├── use-cases/       GetProfile, ListProjects, ListProjectTechnologies, ListSkillsByCategory
│   └── PortfolioUseCases.ts
├── infrastructure/      Implementaciones concretas
│   ├── data/            portfolioContent.ts (contenido del sitio)
│   └── repositories/    Static*Repository
├── presentation/        Interfaz React
│   ├── components/      Header, Hero, About, Skills, Projects, Contact, Footer…
│   ├── context/         UseCasesContext (inyección de casos de uso)
│   ├── hooks/           useAsync
│   ├── styles/          global.css
│   ├── siteConfig.ts    Nombre del sitio y secciones del menú
│   └── App.tsx
├── composition/
│   └── container.ts     Conecta repositorios con casos de uso
└── main.tsx             Punto de entrada
```

```
presentation ──► application ──► domain ◄── infrastructure
        ▲                                        ▲
        └──────────── composition ───────────────┘
```

### Flujo de una carga de datos

Ejemplo con la sección Proyectos:

1. `main.tsx` llama a `createContainer()`, que crea `StaticProjectRepository` con los datos de `portfolioContent.ts` y se lo pasa al caso de uso `ListProjects`.
2. El contenedor se entrega a React mediante `UseCasesContext`.
3. El componente `Projects` obtiene `listProjects` con `useUseCases()` y lo ejecuta con `useAsync`.
4. `ListProjects` pide los proyectos al repositorio (solo conoce la interfaz `ProjectRepository`), los filtra por tecnología y los ordena con las reglas del dominio.
5. El componente muestra "Cargando…", el error o las tarjetas, según el estado.

### Regla de dependencias

ESLint hace cumplir los límites entre capas. Por ejemplo, si un componente importa algo de `infrastructure`, `npm run lint` falla con:

```
La capa "presentation" no puede depender de "infrastructure".
```

### Cambiar la fuente de datos

Para leer el contenido de una API o un CMS:

1. Crear un repositorio nuevo en `src/infrastructure/repositories/` que implemente la interfaz del dominio (por ejemplo `HttpProjectRepository implements ProjectRepository`).
2. Reemplazarlo en `src/composition/container.ts`.

No hace falta tocar dominio, casos de uso ni componentes.

## Decisiones

Ver [docs/DECISIONS.md](docs/DECISIONS.md). Cada decisión nueva se agrega ahí como un ADR numerado.
