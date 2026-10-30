import type { Project } from '../entities/Project'
import type { ListRepository } from './ListRepository'

export type ProjectRepository = ListRepository<Project>
