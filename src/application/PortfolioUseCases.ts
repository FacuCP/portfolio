import type { Education } from '../domain/entities/Education'
import type { Experience } from '../domain/entities/Experience'
import type { Project } from '../domain/entities/Project'
import type { GetProfile } from './use-cases/GetProfile'
import type { ListCollection } from './use-cases/ListCollection'

/** Contrato que la capa de presentación consume; lo arma el composition root. */
export interface PortfolioUseCases {
  readonly getProfile: GetProfile
  readonly listProjects: ListCollection<Project>
  readonly listEducation: ListCollection<Education>
  readonly listExperience: ListCollection<Experience>
}
