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
    titulo: { es: 'Lorem ipsum', en: 'Lorem ipsum' },
    resumen: {
      es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    detalle: {
      es: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `,
      en: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `,
    },
    medios: ['ejemplo.svg', 'ejemplo-2.svg', 'ejemplo-3.svg'],
    // Ejemplo con los dos tipos de botón; el primero con texto propio.
    botones: [
      { texto: { es: 'Lorem ipsum', en: 'Lorem ipsum' }, enlace: 'https://example.com' },
      { descarga: 'ejemplo.txt' },
    ],
  },
  {
    titulo: 'Dolor sit amet',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
    // Ejemplo con un solo botón de enlace (sin `texto`: dice "Abrir enlace").
    botones: [{ enlace: 'https://example.com' }],
  },
  {
    titulo: 'Consectetur adipiscing',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
    // Ejemplo con un solo botón de descarga (sin `texto`: dice "Descargar").
    botones: [{ descarga: 'ejemplo.txt' }],
  },
  {
    titulo: 'Sed do eiusmod',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
  },
  {
    titulo: 'Tempor incididunt',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
  },
  {
    titulo: 'Ut labore et dolore',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
  },
]

// ------------------------------------------------------------
//  ESTUDIOS
// ------------------------------------------------------------
export const estudios: ItemDeCarrusel[] = [
  {
    titulo: { es: 'Lorem ipsum', en: 'Lorem ipsum' },
    resumen: {
      es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    detalle: {
      es: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `,
      en: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `,
    },
    medios: ['ejemplo.svg', 'ejemplo-2.svg', 'ejemplo-3.svg'],
  },
  {
    titulo: 'Dolor sit amet',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
  },
  {
    titulo: 'Consectetur adipiscing',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
  },
  {
    titulo: 'Sed do eiusmod',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
  },
]

// ------------------------------------------------------------
//  EXPERIENCIA
// ------------------------------------------------------------
export const experiencia: ItemDeCarrusel[] = [
  {
    titulo: { es: 'Lorem ipsum', en: 'Lorem ipsum' },
    resumen: {
      es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    detalle: {
      es: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `,
      en: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `,
    },
    medios: ['ejemplo.svg', 'ejemplo-2.svg', 'ejemplo-3.svg'],
  },
  {
    titulo: 'Dolor sit amet',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
  },
  {
    titulo: 'Consectetur adipiscing',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
  },
  {
    titulo: 'Sed do eiusmod',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    medios: ['ejemplo.svg'],
  },
]
