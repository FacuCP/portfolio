import { isLanguage, type Language } from '../../domain/entities/Language'

const STORAGE_KEY = 'idioma'
const FALLBACK: Language = 'en'

/**
 * Idioma inicial: el que la persona eligió antes con el switch (si lo hizo);
 * si no, el primero de los idiomas preferidos del navegador/sistema que el
 * sitio soporte; si ninguno, inglés.
 */
export function detectLanguage(): Language {
  const saved = readSaved()
  if (saved) return saved

  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of preferred) {
    const base = tag.toLowerCase().split('-')[0]
    if (isLanguage(base)) return base
  }
  return FALLBACK
}

export function saveLanguage(language: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {
    // Sin almacenamiento (modo privado, bloqueado): la elección dura solo esta visita.
  }
}

function readSaved(): Language | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return isLanguage(value) ? value : null
  } catch {
    return null
  }
}
