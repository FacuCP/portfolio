# Portfolio Facundo Caceres

Sitio web personal para mostrar mis proyectos, estudios, experiencia y datos de contacto.

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
| Inicio | Nombre en grande, subtítulo (rol) y un texto corto "sobre mí". Ocupa la pantalla completa |
| Proyectos | Carrusel circular de tarjetas rectangulares con imagen de fondo, título, descripción breve y botón "Ver más", que agranda la foto y muestra título, descripción e información adicional al costado (debajo, en el teléfono). La principal al frente y las demás detrás. Flechas, puntos, swipe y teclado |
| Estudios | Carrusel, igual que Proyectos |
| Experiencia | Carrusel, igual que Proyectos |
| Contacto | Texto, email y redes sociales |

El diseño es futurista y siempre oscuro: fondo con grilla, estrellas animadas y luces de neón celeste y rosa. La cantidad, los colores y la velocidad de las estrellas se ajustan al principio de `src/presentation/components/Starfield.tsx`. Los colores se cambian en las variables de `:root`, al principio de `src/presentation/styles/global.css`.

### Idiomas

El sitio está en español e inglés. El selector **ES | EN** del header cambia el idioma. La primera vez se usa el idioma del navegador/sistema (si no es español ni inglés, inglés). Si la persona elige uno con el selector, se recuerda en esa computadora.

## Cómo editar el contenido

Todo el contenido está en `src/content/`.

### Textos en dos idiomas

Cualquier texto del contenido se puede escribir de dos formas (ver `src/content/idiomas.ts`):

```ts
titulo: 'Mi proyecto'                              // igual en ambos idiomas
titulo: { es: 'Mi proyecto', en: 'My project' }    // traducido
```

No hace falta traducir todo: si falta `en`, en inglés se muestra el texto en español. Los textos fijos de la interfaz ("Ver más", nombres de las secciones, etc.) están en `src/presentation/i18n/translations.ts`.

### Items de los carruseles

Se editan en **`src/content/carruseles.ts`**, que tiene una lista por carrusel (`proyectos`, `estudios`, `experiencia`). Para agregar un item se copia un bloque y se cambian los textos:

```ts
{
  titulo: { es: 'Mi proyecto', en: 'My project' },
  resumen: { es: 'Descripción breve.', en: 'Short description.' },
  detalle: {
    es: `
      Primer párrafo que aparece al tocar "Ver más".

      Segundo párrafo (separado por una línea en blanco).
    `,
    en: `
      First paragraph.

      Second paragraph.
    `,
  },
  imagen: 'mi-proyecto.jpg',
},
```

- `detalle` e `imagen` son opcionales.
- La imagen se guarda en `public/imagenes/` y se indica solo su nombre. También se puede poner una URL completa.
- Los items se muestran en el orden del archivo.

### Datos personales

Se editan en **`src/content/perfil.ts`**: nombre, rol, texto "sobre mí", texto de contacto, email y redes.

> Los textos en lorem ipsum son de relleno y hay que reemplazarlos antes de publicar.

## Arquitectura

El código se divide en capas. Cada capa solo puede depender de las capas más internas:

```
src/
├── content/             Contenido editable a mano: perfil.ts, carruseles.ts, idiomas.ts
├── domain/              Entidades, reglas puras e interfaces de repositorios
│   ├── entities/        Language, Profile, PortfolioEntry, Project, Education, Experience
│   └── repositories/    ProfileRepository, ListRepository (+ alias por entidad)
├── application/         Casos de uso
│   ├── use-cases/       GetProfile, ListCollection
│   └── PortfolioUseCases.ts
├── infrastructure/      Implementaciones concretas
│   ├── data/            Convierte content/ en entidades, en el idioma pedido (portfolioContent, carouselItems, localize)
│   └── repositories/    Static*Repository
├── presentation/        Interfaz React
│   ├── components/      Header, LanguageSwitch, Hero, Carousel, CarouselSection, Contact, Footer…
│   ├── context/         UseCasesContext (inyección de casos de uso)
│   ├── hooks/           useAsync
│   ├── i18n/            Idioma actual (LanguageProvider), detección y textos fijos de la interfaz
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

1. `main.tsx` llama a `createContainer()`, que crea un `StaticListRepository` con `projectsFor` (de `portfolioContent.ts`) y se lo pasa al caso de uso `listProjects` (un `ListCollection<Project>`).
2. El contenedor se entrega a React mediante `UseCasesContext`, y el idioma actual mediante `LanguageProvider`.
3. `App` arma `() => listProjects.execute(language)` y se lo pasa a `CarouselSection`, que lo ejecuta con `useAsync`. Si cambia el idioma, la función cambia y se vuelve a pedir el contenido.
4. `ListCollection` pide los proyectos al repositorio (solo conoce la interfaz `ListRepository`), que los devuelve con los textos del idioma pedido.
5. `CarouselSection` muestra "Cargando…", el error o el carrusel, según el estado.

### Regla de dependencias

ESLint hace cumplir los límites entre capas. Por ejemplo, si un componente importa algo de `infrastructure`, `npm run lint` falla con:

```
La capa "presentation" no puede depender de "infrastructure".
```

### Cambiar la fuente de datos

Para leer el contenido de una API o un CMS:

1. Crear un repositorio nuevo en `src/infrastructure/repositories/` que implemente la interfaz del dominio (por ejemplo `HttpProjectRepository implements ListRepository<Project>`).
2. Reemplazarlo en `src/composition/container.ts`.

No hace falta tocar dominio, casos de uso ni componentes.

## Decisiones

Ver [docs/DECISIONS.md](docs/DECISIONS.md). Cada decisión nueva se agrega ahí como un ADR numerado.
