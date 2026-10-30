import type { EntryAction } from './EntryAction'
import type { Media } from './Media'

/** Elemento que se muestra en un carrusel: proyecto, estudio o experiencia. */
export interface PortfolioEntry {
  readonly id: string
  readonly title: string
  /** Descripción breve, visible en la tarjeta. */
  readonly summary: string
  /** Texto completo, visible al expandir la tarjeta. Un elemento por párrafo. */
  readonly description: readonly string[]
  /**
   * Imágenes y videos, en orden. La tarjeta muestra el primero; al expandirla
   * se recorren todos (imágenes unos segundos cada una, videos completos).
   */
  readonly media: readonly Media[]
  /** Botones del detalle (enlaces o descargas), en orden. Puede estar vacío. */
  readonly actions: readonly EntryAction[]
}
