import { useCallback } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { StatusMessage } from './components/StatusMessage'
import { useUseCases } from './context/UseCasesContext'
import { useAsync } from './hooks/useAsync'

export function App() {
  const { getProfile } = useUseCases()
  const loadProfile = useCallback(() => getProfile.execute(), [getProfile])
  const profile = useAsync(loadProfile)

  return (
    <>
      <Header />
      <main>
        {profile.status === 'success' ? (
          <>
            <Hero profile={profile.data} />
            <About profile={profile.data} />
            <Skills />
            <Projects />
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
