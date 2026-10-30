import type { PortfolioUseCases } from '../application/PortfolioUseCases'
import { GetProfile } from '../application/use-cases/GetProfile'
import { ListProjects } from '../application/use-cases/ListProjects'
import { ListProjectTechnologies } from '../application/use-cases/ListProjectTechnologies'
import { ListSkillsByCategory } from '../application/use-cases/ListSkillsByCategory'
import { profile, projects, skills } from '../infrastructure/data/portfolioContent'
import { StaticProfileRepository } from '../infrastructure/repositories/StaticProfileRepository'
import { StaticProjectRepository } from '../infrastructure/repositories/StaticProjectRepository'
import { StaticSkillRepository } from '../infrastructure/repositories/StaticSkillRepository'

/**
 * Composition root: único lugar que conoce las implementaciones concretas.
 * Para cambiar la fuente de datos (por ejemplo, una API) se reemplazan
 * los repositorios acá, sin tocar dominio, aplicación ni presentación.
 */
export function createContainer(): PortfolioUseCases {
  const profileRepository = new StaticProfileRepository(profile)
  const projectRepository = new StaticProjectRepository(projects)
  const skillRepository = new StaticSkillRepository(skills)

  return {
    getProfile: new GetProfile(profileRepository),
    listProjects: new ListProjects(projectRepository),
    listProjectTechnologies: new ListProjectTechnologies(projectRepository),
    listSkillsByCategory: new ListSkillsByCategory(skillRepository),
  }
}
