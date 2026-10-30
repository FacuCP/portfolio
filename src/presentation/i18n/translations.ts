import type { Language } from '../../domain/entities/Language'
import type { SectionId } from '../siteConfig'

/** Textos fijos de la interfaz. El contenido (perfil, carruseles) se traduce en src/content/. */
export interface Translations {
  readonly sections: Record<SectionId, string>
  readonly sectionsNav: string
  readonly languageSwitch: string
  readonly scrollDown: string
  readonly seeMore: string
  readonly closeDetail: string
  readonly previous: string
  readonly next: string
  readonly carousel: string
  readonly loading: string
  readonly loadError: string
}

export const translations: Record<Language, Translations> = {
  es: {
    sections: { proyectos: 'Proyectos', estudios: 'Estudios', experiencia: 'Experiencia', contacto: 'Contacto' },
    sectionsNav: 'Secciones',
    languageSwitch: 'Idioma',
    scrollDown: 'Bajar a Proyectos',
    seeMore: 'Ver más',
    closeDetail: 'Cerrar detalle',
    previous: 'Anterior',
    next: 'Siguiente',
    carousel: 'carrusel',
    loading: 'Cargando…',
    loadError: 'No se pudo cargar el contenido.',
  },
  en: {
    sections: { proyectos: 'Projects', estudios: 'Education', experiencia: 'Experience', contacto: 'Contact' },
    sectionsNav: 'Sections',
    languageSwitch: 'Language',
    scrollDown: 'Scroll to Projects',
    seeMore: 'See more',
    closeDetail: 'Close details',
    previous: 'Previous',
    next: 'Next',
    carousel: 'carousel',
    loading: 'Loading…',
    loadError: 'The content could not be loaded.',
  },
}
