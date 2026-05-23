import { useState } from 'react'
import { fi } from './i18n/fi'
import { ModeToggle, type Mode } from './components/ModeToggle'
import { BuildMode } from './modes/BuildMode'
import { SolveMode } from './modes/SolveMode'

export default function App() {
  const [mode, setMode] = useState<Mode>('build')

  return (
    <div className="app">
      <header className="app__bar">
        <div className="app__brand">
          <h1 className="app__title">{fi.appTitle}</h1>
          <span className="app__tagline">{fi.appTagline}</span>
        </div>
        <ModeToggle mode={mode} onChange={setMode} />
      </header>

      <main className="app__main">
        {mode === 'build' ? <BuildMode /> : <SolveMode />}
      </main>
    </div>
  )
}
