import type { Skill } from '../entities/Skill'

export interface SkillRepository {
  getAll(): Promise<readonly Skill[]>
}
