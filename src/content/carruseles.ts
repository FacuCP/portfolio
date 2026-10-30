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
 *    imagen   → nombre del archivo dentro de la carpeta public/imagenes/
 *               (por ejemplo 'mi-proyecto.jpg') o una URL completa (opcional).
 *
 *  IDIOMAS: cada texto puede escribirse
 *    - igual en ambos idiomas:  titulo: 'Mi proyecto'
 *    - traducido:               titulo: { es: 'Mi proyecto', en: 'My project' }
 *  Si falta `en`, en inglés se muestra el texto en español.
 *  El primer item de cada lista usa la forma traducida como ejemplo.
 *
 *  Los textos van entre comillas simples '...'. El detalle va entre
 *  comillas invertidas `...` porque puede ocupar varias líneas.
 */

export interface ItemDeCarrusel {
  titulo: Texto
  resumen: Texto
  detalle?: Texto
  imagen?: string
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
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Dolor sit amet',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Consectetur adipiscing',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Sed do eiusmod',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Tempor incididunt',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Ut labore et dolore',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
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
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Dolor sit amet',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Consectetur adipiscing',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Sed do eiusmod',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
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
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Dolor sit amet',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Consectetur adipiscing',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
  },
  {
    titulo: 'Sed do eiusmod',
    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detalle: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    `,
    imagen: 'ejemplo.svg',
  },
]
