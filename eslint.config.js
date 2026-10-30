import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Regla de dependencias de Clean Architecture: cada capa declara
// qué capas NO puede importar. Ver docs/DECISIONS.md (ADR-002 y ADR-007).
const layer = (name, forbidden) => ({
  files: [`src/${name}/**/*.{ts,tsx}`],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: forbidden.map((target) => ({
          group: target === 'react' ? ['react', 'react-dom', 'react/*', 'react-dom/*'] : [`**/${target}/**`],
          message: `La capa "${name}" no puede depender de "${target}".`,
        })),
      },
    ],
  },
})

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  layer('domain', ['application', 'infrastructure', 'presentation', 'composition', 'react']),
  layer('application', ['infrastructure', 'presentation', 'composition', 'react']),
  layer('infrastructure', ['application', 'presentation', 'composition', 'react']),
  layer('presentation', ['infrastructure', 'composition']),
  // Contenido editable a mano: datos puros, solo lo lee infraestructura.
  layer('content', ['domain', 'application', 'infrastructure', 'presentation', 'composition', 'react']),
])
