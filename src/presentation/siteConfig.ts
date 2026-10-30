export const SITE_NAME = 'Portfolio Facundo Caceres'

/** Secciones del menú, en orden. Los textos visibles están en i18n/translations.ts. */
export const SECTION_IDS = ['proyectos', 'estudios', 'experiencia', 'contacto'] as const

export type SectionId = (typeof SECTION_IDS)[number]
