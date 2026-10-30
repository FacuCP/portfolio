import { useCallback } from 'react'
import { CarouselSection } from './components/CarouselSection'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { StatusMessage } from './components/StatusMessage'
import { useUseCases } from './context/UseCasesContext'
import { useAsync } from './hooks/useAsync'
import { useLanguage } from './i18n/LanguageContext'

export function App() {
  const { getProfile, listProjects, listEducation, listExperience } = useUseCases()
  const { language, t } = useLanguage()

  // Al cambiar el idioma, cambian las funciones de carga y useAsync vuelve a pedir el contenido.
  const loadProfile = useCallback(() => getProfile.execute(language), [getProfile, language])
  const loadProjects = useCallback(() => listProjects.execute(language), [listProjects, language])
  const loadEducation = useCallback(() => listEducation.execute(language), [listEducation, language])
  const loadExperience = useCallback(() => listExperience.execute(language), [listExperience, language])
  const profile = useAsync(loadProfile)

  return (
    <>
      <Header />
      <main>
        {profile.status === 'success' ? (
          <>
            <Hero profile={profile.data} />
            <CarouselSection id="proyectos" title={t.sections.proyectos} load={loadProjects} />
            <CarouselSection id="estudios" title={t.sections.estudios} load={loadEducation} />
            <CarouselSection id="experiencia" title={t.sections.experiencia} load={loadExperience} />
            <Contact profile={profile.data} />
          </>
        ) : (
          <div className="container">
            <StatusMessage state={profile} />
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
