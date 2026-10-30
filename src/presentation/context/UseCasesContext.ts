import { createContext, useContext } from 'react'
import type { PortfolioUseCases } from '../../application/PortfolioUseCases'

export const UseCasesContext = createContext<PortfolioUseCases | null>(null)

export function useUseCases(): PortfolioUseCases {
  const useCases = useContext(UseCasesContext)
  if (!useCases) {
    throw new Error('useUseCases debe usarse dentro de <UseCasesContext>')
  }
  return useCases
}
