/*
 * Cómo escribir un texto en ambos idiomas.
 *
 *  - Igual en español e inglés:   'Lorem ipsum'
 *  - Traducido:                   { es: 'Hola', en: 'Hello' }
 *
 *  Si falta `en`, en inglés se muestra el texto en español.
 */
export type Texto = string | { es: string; en?: string }
