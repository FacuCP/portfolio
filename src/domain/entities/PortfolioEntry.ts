/** Elemento que se muestra en un carrusel: proyecto, estudio o experiencia. */
export interface PortfolioEntry {
  readonly id: string
  readonly title: string
  /** Descripción breve, visible en la tarjeta. */
  readonly summary: string
  /** Texto completo, visible al expandir la tarjeta. Un elemento por párrafo. */
  readonly description: readonly string[]
  /** URL de la imagen de fondo. */
  readonly image?: string
}
