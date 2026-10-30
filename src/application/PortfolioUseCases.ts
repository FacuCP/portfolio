import type { GetProfile } from './use-cases/GetProfile'
import type { ListProjects } from './use-cases/ListProjects'
import type { ListProjectTechnologies } from './use-cases/ListProjectTechnologies'
import type { ListSkillsByCategory } from './use-cases/ListSkillsByCategory'

/** Contrato que la capa de presentación consume; lo arma el composition root. */
export interface PortfolioUseCases {
  readonly getProfile: GetProfile
  readonly listProjects: ListProjects
  readonly listProjectTechnologies: ListProjectTechnologies
  readonly listSkillsByCategory: ListSkillsByCategory
}
