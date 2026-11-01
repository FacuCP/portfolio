import type { Texto } from './idiomas'

/*
 * ============================================================
 *  CONTENIDO DE LOS CARRUSELES
 * ============================================================
 *
 *  Para AGREGAR un item: copiá un bloque { ... }, pegalo en la lista
 *  que quieras (proyectos, estudios o experiencia) y cambiá los textos.
 *  Para QUITAR uno: borrá su bloque. Se muestran en este mismo orden.
 *
 *  Campos de cada item:
 *    titulo   → título de la tarjeta.
 *    resumen  → descripción breve que se ve en la tarjeta.
 *    detalle  → texto que aparece al tocar "Ver más" (opcional).
 *               Dejá una línea en blanco para empezar otro párrafo.
 *    medios   → lista de imágenes y videos, entre corchetes y separados
 *               por comas (opcional). Cada uno es el nombre de un archivo
 *               dentro de la carpeta public/imagenes/ o una URL completa:
 *                 medios: ['foto.jpg', 'demo.mp4', 'otra-foto.png'],
 *               - La tarjeta muestra el primero (si es un video, su primer cuadro).
 *               - Al tocar "Ver más" se recorren todos: cada imagen 5 segundos
 *                 y cada video completo (empieza sin sonido).
 *               - Videos: .mp4, .webm, .ogv, .mov o .m4v. Lo demás se toma como imagen.
 *    botones  → botones que aparecen al tocar "Ver más" (opcional). Puede haber
 *               ninguno, uno o varios. Cada botón ABRE UN ENLACE o DESCARGA UN ARCHIVO:
 *                 botones: [
 *                   { enlace: 'https://github.com/usuario/proyecto' },
 *                   { descarga: 'informe.pdf' },
 *                 ],
 *               - enlace:   dirección completa; se abre en una pestaña nueva.
 *               - descarga: nombre de un archivo dentro de public/archivos/
 *                           (o una URL completa).
 *               - texto:    lo que dice el botón (opcional). Si falta, dice
 *                           "Abrir enlace" o "Descargar" (en el idioma elegido):
 *                 { texto: { es: 'Ver código', en: 'View code' }, enlace: '...' }
 *
 *  IDIOMAS: cada texto puede escribirse
 *    - igual en ambos idiomas:  titulo: 'Mi proyecto'
 *    - traducido:               titulo: { es: 'Mi proyecto', en: 'My project' }
 *  Si falta `en`, en inglés se muestra el texto en español.
 *  El primer item de cada lista usa la forma traducida como ejemplo.
 *
 *  Los textos van entre comillas simples '...'. El detalle va entre
 *  comillas invertidas `...` porque puede ocupar varias líneas.
 
  PLANTILLA

  {
  titulo: { es: '', en: '' },
    resumen: { es: '', en: '' },
    detalle: {
      es: `
      `,
      en: `
      `,
    },
  medios: '.jpg', '.mp4'],
  botones: [
      { texto: { es: '', en: '' }, enlace: '' },
      { descarga: '' },
    ],
}

*/

/** Un botón tiene `enlace` o `descarga` (no los dos). */
export type Boton =
  | { texto?: Texto; enlace: string; descarga?: undefined }
  | { texto?: Texto; descarga: string; enlace?: undefined }

export interface ItemDeCarrusel {
  titulo: Texto
  resumen: Texto
  detalle?: Texto
  medios?: string[]
  botones?: Boton[]
}

// ------------------------------------------------------------
//  PROYECTOS
// ------------------------------------------------------------
export const proyectos: ItemDeCarrusel[] = [
  {
    titulo: { es: 'Ascenso Celestial', en: 'Ascenso Celestial' },
    resumen: {
      es: 'Videojuego roguelite en Unity y C#, mi Proyecto Final de Graduación (calificación 10/10).',
      en: 'Roguelite video game in Unity and C#, my Final Graduation Project (graded 10/10).',
    },
    detalle: {
      es: `
        Ascenso Celestial es el videojuego roguelite que desarrollé como Proyecto Final de Graduación de Ingeniería en Computación, con calificación 10/10. Está hecho en Unity con C# orientado a objetos.

        Programé el sistema de combate con varias habilidades, un sistema de mejoras, enemigos que persiguen y atacan al jugador, un sistema de diálogos con progresión de historia y un sistema de guardado. Los niveles son fijos y los enemigos aparecen de forma aleatoria, así que cada partida es distinta. También diseñé las interfaces para que sean claras e intuitivas.
      `,
      en: `
        Ascenso Celestial is the roguelite video game I developed as my Final Graduation Project in Computer Engineering, graded 10/10. It is built in Unity with object-oriented C#.

        I programmed the combat system with multiple abilities, an upgrade system, enemies that chase and attack the player, a dialogue system with story progression and a save system. Levels are fixed and enemies spawn randomly, so every run is different. I also designed the interfaces to be clear and intuitive.
      `,
    },
    medios: ['pantallaJuego.png', 'demoJuego.mp4'],
    botones: [
      { texto: { es: 'Repositorio de Git', en: 'Git Repository' }, enlace: 'https://github.com/FacuCP/AscensoCelestial' },
      { texto: { es: 'Descarga para Windows', en: 'Download for Windows' }, enlace: 'https://github.com/FacuCP/AscensoCelestial/releases/download/WindowsVersion/Ascenso.Celestial.-.Windows.zip' },
      { texto: { es: 'Descarga para Linux', en: 'Download for Linux' }, enlace: 'https://github.com/FacuCP/AscensoCelestial/releases/download/LinuxVersion/Ascenso.Celestial.-.Linux.tar' },
    ],
  },
  {
    titulo: 'QuimiCampus',
    resumen: {
      es: 'Aplicación web de química que se usa en clases de secundaria, de 2.º a 4.º año.',
      en: 'Chemistry web app used in secondary-school classes, from 2nd to 4th year.',
    },
    detalle: {
      es: `
        La desarrollé con Claude Code para mi mamá, docente de química de secundaria, y hoy la usa en todos sus cursos de 2.º a 4.º año. Definimos los requisitos juntos y la fui mejorando a partir de cómo la usaban los alumnos en el aula.

        Tiene una tabla periódica interactiva con búsqueda y configuración electrónica calculada a partir del número atómico, una calculadora de cantidades, un generador de compuestos inorgánicos hasta sales cuaternarias que arma la fórmula y la nombra en tres nomenclaturas, y modos de práctica cronometrados para formar y nombrar compuestos, con corrección automática. Con ella los alumnos practican más, calculan más rápido y pueden comprobar sus propios resultados.

        Está hecha con React, TypeScript, Vite, Tailwind CSS y React Router, organizada con Clean Architecture y con diseño responsive para usarla desde el celular.
      `,
      en: `
        I built it with Claude Code for my mother, a secondary-school chemistry teacher, and she now uses it in all her courses from 2nd to 4th year. We defined the requirements together and I kept improving it based on how students used it in class.

        It includes an interactive periodic table with search and electron configurations computed from the atomic number, a quantity calculator, an inorganic compound generator up to quaternary salts that builds the formula and names it in three nomenclature systems, and timed practice modes for forming and naming compounds with automatic answer checking. Students practice more, calculate faster and can check their own results.

        It is built with React, TypeScript, Vite, Tailwind CSS and React Router, organized with Clean Architecture, with a responsive design for use on phones.
      `,
    },
    botones: [
      { texto: { es: 'Abrir la aplicación', en: 'Open the app' }, enlace: 'https://quimicampus.vercel.app/' },
      { texto: { es: 'Repositorio de Git', en: 'Git Repository' }, enlace: 'https://github.com/FacuCP/quimicampus' },
    ],
  },
  {
    titulo: { es: 'App de Seguimiento Personal', en: 'Personal Tracker App' },
    resumen: {
      es: 'App Android en React Native para hábitos, finanzas, gimnasio y eventos, que uso todos los días.',
      en: 'React Native Android app for habits, finances, gym and events that I use every day.',
    },
    detalle: {
      es: `
        Una app móvil que desarrollé con Claude Code para organizar mi día a día, y que uso todos los días. Tiene siete secciones: estado de ánimo, trackers personalizados con estadísticas, listas y tareas, finanzas con categorías, movimientos recurrentes y reportes por semana, mes o año, rutinas de gimnasio con una sesión guiada, calendario de eventos con repetición y una rutina diaria que se reinicia sola.

        Envía notificaciones locales, guarda todo en el teléfono y permite exportar e importar un backup. La instalo como APK con EAS Build.

        Está hecha con Expo, React Native y TypeScript, con Clean Architecture, inyección de dependencias, el patrón ViewModel con hooks y las decisiones de diseño documentadas.
      `,
      en: `
        A mobile app I built with Claude Code to organize my day, and I use it every day. It has seven areas: mood tracking, custom trackers with statistics, lists and to-dos, finances with categories, recurring transactions and weekly, monthly or yearly reports, gym routines with a guided session, a calendar with recurring events and a daily routine that resets itself.

        It sends local notifications, stores everything on the phone and can export and import a backup. I install it as an APK with EAS Build.

        It is built with Expo, React Native and TypeScript, using Clean Architecture, dependency injection, the ViewModel pattern with hooks and documented design decisions.
      `,
    },
    botones: [
      { texto: { es: 'Repositorio de Git', en: 'Git Repository' }, enlace: 'https://github.com/FacuCP/tracker-app' },
    ],
  },
  {
    titulo: { es: 'Sistema de Gestión de Artículos', en: 'Article Management System' },
    resumen: {
      es: 'Aplicación en Java con patrón MVC para gestionar artículos de una facultad (proyecto grupal).',
      en: 'Java application using the MVC pattern to manage articles for a university faculty (group project).',
    },
    detalle: {
      es: `
        Proyecto grupal de la carrera: una aplicación orientada a objetos en Java, organizada con el patrón MVC, para gestionar los artículos de una facultad. Trabajamos en equipo con control de versiones en GitHub.
      `,
      en: `
        Group project from my degree: an object-oriented Java application, organized with the MVC pattern, to manage a university faculty's articles. We worked as a team with version control on GitHub.
      `,
    },
  },
]

// ------------------------------------------------------------
//  ESTUDIOS
// ------------------------------------------------------------
export const estudios: ItemDeCarrusel[] = [
  {
    titulo: { es: 'Ingeniería en Computación', en: 'Computer Engineering' },
    resumen: {
      es: 'Universidad Nacional de Tucumán (FACET), 2021-2026. Graduado en abril de 2026.',
      en: 'National University of Tucumán (FACET), 2021-2026. Graduated in April 2026.',
    },
    detalle: {
      es: `
        Me recibí de Ingeniero en Computación en la Facultad de Ciencias Exactas y Tecnología de la Universidad Nacional de Tucumán el 22 de abril de 2026.

        Materias destacadas: Programación I (10), Métodos Numéricos (10), Probabilidad y Estadística (10), Programación II (9), Estructuras de Datos y Algoritmos (9), Laboratorio de Bases de Datos (9), Inteligencia Artificial (9), Arquitectura de Computadoras (9), Lógica y Álgebra Discreta (9) e Ingeniería de Software (8).

        Mi Proyecto Final de Graduación, el videojuego Ascenso Celestial, obtuvo un 10.
      `,
      en: `
        I graduated as a Computer Engineer from the Faculty of Exact Sciences and Technology, National University of Tucumán, on 22 April 2026.

        Notable grades (out of 10): Programming I (10), Numerical Methods (10), Probability and Statistics (10), Programming II (9), Data Structures and Algorithms (9), Database Laboratory (9), Artificial Intelligence (9), Computer Architecture (9), Logic and Discrete Algebra (9) and Software Engineering (8).

        My Final Graduation Project, the video game Ascenso Celestial, was graded 10.
      `,
    },
  },
  {
    titulo: { es: 'Unreal Engine 5 C++ Developer Course', en: 'Unreal Engine 5 C++ Developer Course' },
    resumen: {
      es: 'Curso de desarrollo de videojuegos en Unreal Engine 5 con C++, en Udemy.',
      en: 'Game development course in Unreal Engine 5 with C++, on Udemy.',
    },
  },
  {
    titulo: { es: 'Técnico Mecánico Electricista', en: 'Mechanical and Electrical Technician' },
    resumen: {
      es: 'Instituto Técnico, Universidad Nacional de Tucumán, 2014-2020.',
      en: 'Technical Institute, National University of Tucumán, 2014-2020.',
    },
  },
]

// ------------------------------------------------------------
//  EXPERIENCIA
// ------------------------------------------------------------
export const experiencia: ItemDeCarrusel[] = [
  {
    titulo: { es: 'Desarrollador Web Fullstack Jr', en: 'Junior Fullstack Web Developer' },
    resumen: {
      es: 'Caja Popular de Ahorros, Tucumán. Junio 2025 - junio 2026.',
      en: 'Caja Popular de Ahorros (banking), Tucumán. June 2025 - June 2026.',
    },
    detalle: {
      es: `
        Desarrollé aplicaciones web para una entidad bancaria dentro de un equipo de desarrollo, trabajando tanto en backend como en frontend.

        En el Portal Web para Empleados Bancarios, una aplicación de una sola página en React, creé módulos nuevos en TypeScript y mantuve los existentes. En el backend, con Python, Django REST Framework y PostgreSQL, programé lógica de negocio para flujos de varios pasos entre módulos que dependen unos de otros, cálculos de cuotas e impuestos, búsquedas combinadas por muchos atributos y migración de datos heredados. Optimicé consultas entre varias tablas y agregué paginación en casi todas las tablas.

        También trabajé con Next.js, Tailwind CSS, Material-UI y Node.js, contenedoricé y desplegué aplicaciones con Docker y mantuve pipelines de GitLab CI/CD.
      `,
      en: `
        I built web applications for a banking institution as part of a development team, working on both backend and frontend.

        On the Web Portal for Banking Employees, a React single-page application, I built new modules in TypeScript and maintained existing ones. On the backend, with Python, Django REST Framework and PostgreSQL, I implemented business logic for multi-step workflows across interdependent modules, installment and tax calculations, combined searches over many attributes and legacy data migration. I optimized queries across multiple tables and added pagination to nearly all tables.

        I also worked with Next.js, Tailwind CSS, Material-UI and Node.js, containerized and deployed applications with Docker, and maintained GitLab CI/CD pipelines.
      `,
    },
  },
  {
    titulo: { es: 'Ayudante de Cátedra', en: 'Teaching Assistant' },
    resumen: {
      es: 'FACET, Universidad Nacional de Tucumán. 2023 - 2026.',
      en: 'FACET, National University of Tucumán. 2023 - 2026.',
    },
    detalle: {
      es: `
        Durante tres años acompañé las clases prácticas de programación estructurada en C y programación orientada a objetos en Java, en las materias Informática, Programación I y Programación II.

        Ayudaba a los estudiantes a resolver problemas, depurar su código y aplicar buenas prácticas, y guiaba trabajos grupales con Git y herramientas colaborativas.
      `,
      en: `
        For three years I supported practical classes on structured programming in C and object-oriented programming in Java, in the courses Computer Science Fundamentals, Programming I and Programming II.

        I helped students solve problems, debug their code and apply good practices, and guided group projects using Git and collaborative tools.
      `,
    },
  },
]