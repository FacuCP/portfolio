import type { Texto } from './idiomas'

/*
 * ============================================================
 *  DATOS PERSONALES
 * ============================================================
 *
 *  Los textos pueden ir igual en ambos idiomas ('...') o traducidos
 *  ({ es: '...', en: '...' }). Ver src/content/idiomas.ts.
 *
 *  sobreMi va entre comillas invertidas `...` porque puede ocupar
 *  varias líneas. Dejá una línea en blanco para empezar otro párrafo.
 */

export interface Perfil {
  nombre: string
  rol: Texto
  sobreMi: Texto
  textoContacto: Texto
  email: string
  redes: { nombre: Texto; url: string }[]
}

export const perfil: Perfil = {
  nombre: 'Facundo Cáceres Perillo',
  rol: { es: 'Ingeniero en Computación', en: 'Computer Engineer' },
  sobreMi: {
    es: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    `,
    en: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    `,
  },
  textoContacto: {
    es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  email: 'lorem@ipsum.com',
  redes: [
    { nombre: 'Lorem', url: '#' },
    { nombre: 'Ipsum', url: '#' },
  ],
}
