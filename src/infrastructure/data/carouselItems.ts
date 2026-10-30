import type { ItemDeCarrusel } from '../../content/carruseles'
import type { Language } from '../../domain/entities/Language'
import type { PortfolioEntry } from '../../domain/entities/PortfolioEntry'
import { localize, toParagraphs } from './localize'

/** Convierte los items simples de src/content/carruseles.ts en entidades del dominio, en el idioma pedido. */
export function toPortfolioEntries(
  prefix: string,
  items: readonly ItemDeCarrusel[],
  language: Language,
): PortfolioEntry[] {
  return items.map((item, index) => ({
    id: `${prefix}-${index + 1}`,
    title: localize(item.titulo, language),
    summary: localize(item.resumen, language),
    description: toParagraphs(localize(item.detalle, language)),
    image: resolveImage(item.imagen),
  }))
}

/** Un nombre de archivo se busca en public/imagenes/; una URL completa se usa tal cual. */
function resolveImage(image: string | undefined): string | undefined {
  if (!image) return undefined
  if (/^(https?:)?\/\//.test(image)) return image
  return `${import.meta.env.BASE_URL}imagenes/${image}`
}
