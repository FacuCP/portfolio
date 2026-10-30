import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createContainer } from './composition/container'
import { App } from './presentation/App'
import { UseCasesContext } from './presentation/context/UseCasesContext'
import { LanguageProvider } from './presentation/i18n/LanguageProvider'
import './presentation/styles/global.css'

const useCases = createContainer()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UseCasesContext value={useCases}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </UseCasesContext>
  </StrictMode>,
)
