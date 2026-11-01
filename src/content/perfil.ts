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
      Soy Ingeniero en Computación de Tucumán, Argentina. Trabajé un año como desarrollador fullstack en un banco, con React, TypeScript, Django y PostgreSQL, y por mi cuenta hago aplicaciones web, móviles y videojuegos.

      Me motivan los problemas que me hacen seguir pensando y construir cosas que la gente use de verdad, como QuimiCampus, que hoy se usa en clases de secundaria. Disfruto trabajar en equipo y pensar soluciones en conjunto.
    `,
    en: `
      I'm a Computer Engineer from Tucumán, Argentina. I spent a year as a fullstack developer at a bank, working with React, TypeScript, Django and PostgreSQL, and on my own I build web apps, mobile apps and games.

      I'm driven by problems that keep me thinking and by building things people actually use, like QuimiCampus, which is now used in secondary-school classes. I enjoy working in a team and solving problems together.
    `,
  },
  textoContacto: {
    es: 'Podés encontrarme en estas redes o escribirme por mail.',
    en: 'You can find me on these networks or email me.',
  },
  email: 'facundocaceresperillo@gmail.com',
  redes: [
    { nombre: 'LinkedIn', url: 'https://www.linkedin.com/in/facundo-caceres-perillo/' },
    { nombre: 'GitHub', url: 'https://github.com/FacuCP' },
  ],
}