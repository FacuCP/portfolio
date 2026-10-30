import { estudios, experiencia, proyectos } from '../../content/carruseles'
import { perfil } from '../../content/perfil'
import type { Education } from '../../domain/entities/Education'
import type { Experience } from '../../domain/entities/Experience'
import type { Language } from '../../domain/entities/Language'
import type { Profile } from '../../domain/entities/Profile'
import type { Project } from '../../domain/entities/Project'
import { toPortfolioEntries } from './carouselItems'
import { localize, toParagraphs } from './localize'

/*
 * Convierte el contenido editable de src/content/ en entidades del dominio,
 * con los textos en el idioma pedido. El contenido NO se edita acá:
 * - Datos personales: src/content/perfil.ts
 * - Items de los carruseles: src/content/carruseles.ts
 */

export function profileFor(language: Language): Profile {
  return {
    fullName: perfil.nombre,
    role: localize(perfil.rol, language),
    about: toParagraphs(localize(perfil.sobreMi, language)),
    contactText: localize(perfil.textoContacto, language),
    email: perfil.email,
    socialLinks: perfil.redes.map((red) => ({ label: localize(red.nombre, language), url: red.url })),
  }
}

export const projectsFor = (language: Language): Project[] => toPortfolioEntries('proyecto', proyectos, language)
export const educationFor = (language: Language): Education[] => toPortfolioEntries('estudio', estudios, language)
export const experienceFor = (language: Language): Experience[] =>
  toPortfolioEntries('experiencia', experiencia, language)
