import type { PortfolioUseCases } from '../application/PortfolioUseCases'
import { GetProfile } from '../application/use-cases/GetProfile'
import { ListCollection } from '../application/use-cases/ListCollection'
import type { EducationRepository } from '../domain/repositories/EducationRepository'
import type { ExperienceRepository } from '../domain/repositories/ExperienceRepository'
import type { ProjectRepository } from '../domain/repositories/ProjectRepository'
import { educationFor, experienceFor, profileFor, projectsFor } from '../infrastructure/data/portfolioContent'
import { StaticListRepository } from '../infrastructure/repositories/StaticListRepository'
import { StaticProfileRepository } from '../infrastructure/repositories/StaticProfileRepository'

/**
 * Composition root: único lugar que conoce las implementaciones concretas.
 * Para cambiar la fuente de datos (por ejemplo, una API) se reemplazan
 * los repositorios acá, sin tocar dominio, aplicación ni presentación.
 */
export function createContainer(): PortfolioUseCases {
  const profileRepository = new StaticProfileRepository(profileFor)
  const projectRepository: ProjectRepository = new StaticListRepository(projectsFor)
  const educationRepository: EducationRepository = new StaticListRepository(educationFor)
  const experienceRepository: ExperienceRepository = new StaticListRepository(experienceFor)

  return {
    getProfile: new GetProfile(profileRepository),
    listProjects: new ListCollection(projectRepository),
    listEducation: new ListCollection(educationRepository),
    listExperience: new ListCollection(experienceRepository),
  }
}
