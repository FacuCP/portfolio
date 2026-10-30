import { useCallback } from 'react'
import { useUseCases } from '../context/UseCasesContext'
import { useAsync } from '../hooks/useAsync'
import { Section } from './Section'
import { StatusMessage } from './StatusMessage'

export function Skills() {
  const { listSkillsByCategory } = useUseCases()
  const load = useCallback(() => listSkillsByCategory.execute(), [listSkillsByCategory])
  const state = useAsync(load)

  return (
    <Section id="habilidades" title="Habilidades">
      <StatusMessage state={state} />
      {state.status === 'success' && (
        <div className="skills">
          {state.data.map((group) => (
            <div key={group.category} className="card">
              <h3 className="card__title">{group.category}</h3>
              <ul className="tags">
                {group.skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
