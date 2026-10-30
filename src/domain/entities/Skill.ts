export interface Skill {
  readonly name: string
  readonly category: string
}

export interface SkillGroup {
  readonly category: string
  readonly skills: readonly string[]
}

/** Agrupa por categoría respetando el orden en que aparece cada una. */
export function groupSkillsByCategory(skills: readonly Skill[]): SkillGroup[] {
  const groups = new Map<string, string[]>()
  for (const skill of skills) {
    const group = groups.get(skill.category) ?? []
    group.push(skill.name)
    groups.set(skill.category, group)
  }
  return [...groups].map(([category, names]) => ({ category, skills: names }))
}
