import type { Texto } from '../../content/idiomas'
import type { Language } from '../../domain/entities/Language'

/** Elige la versión del texto para el idioma pedido; si falta la traducción, usa el español. */
export function localize(text: Texto | undefined, language: Language): string {
  if (text === undefined) return ''
  if (typeof text === 'string') return text
  return (language === 'en' ? text.en : undefined) ?? text.es
}

/** Una línea en blanco separa párrafos; los saltos de línea y la indentación dentro de un párrafo se ignoran. */
export function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}
