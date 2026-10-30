import type { Boton, ItemDeCarrusel } from '../../content/carruseles'
import type { EntryAction } from '../../domain/entities/EntryAction'
import type { Language } from '../../domain/entities/Language'
import type { Media } from '../../domain/entities/Media'
import type { PortfolioEntry } from '../../domain/entities/PortfolioEntry'
import { localize, toParagraphs } from './localize'

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogv|ogg|mov|m4v)(?:[?#].*)?$/i

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
    media: (item.medios ?? []).map(toMedia),
    actions: (item.botones ?? []).map((boton) => toAction(boton, language)),
  }))
}

/** Un video se reconoce por la extensión; todo lo demás se trata como imagen. */
function toMedia(file: string): Media {
  return { type: VIDEO_EXTENSIONS.test(file) ? 'video' : 'image', src: resolveUrl(file, 'imagenes') }
}

/** Un botón con `descarga` baja un archivo de public/archivos/; uno con `enlace` abre esa dirección. */
function toAction(boton: Boton, language: Language): EntryAction {
  const label = boton.texto === undefined ? undefined : localize(boton.texto, language)
  if (boton.descarga !== undefined) {
    return { kind: 'download', url: resolveUrl(boton.descarga, 'archivos'), label }
  }
  return { kind: 'link', url: boton.enlace, label }
}

/** Un nombre de archivo se busca en la carpeta indicada de public/; una URL completa se usa tal cual. */
function resolveUrl(file: string, folder: string): string {
  if (/^(https?:)?\/\//.test(file)) return file
  return `${import.meta.env.BASE_URL}${folder}/${file}`
}
