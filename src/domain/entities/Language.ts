export const LANGUAGES = ['es', 'en'] as const

/** Idioma en el que se pide y se muestra el contenido. */
export type Language = (typeof LANGUAGES)[number]

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language)
}
