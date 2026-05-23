import { useState } from 'react'
import { fi } from './i18n/fi'
import { ModeToggle, type Mode } from './components/ModeToggle'
import { BuildMode } from './modes/BuildMode'
import { SolveMode } from './modes/SolveMode'
import { createSamplePuzzle } from './fixtures/samplePuzzle'

export default function App() {
  const [mode, setMode] = useState<Mode>('build')
  // The working puzzle lives here (lifted from BuildMode) so it survives the
  // build/solve toggle and can be handed to both modes.
  const [puzzle, setPuzzle] = useState(createSamplePuzzle)

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
        {mode === 'build' ? (
          <BuildMode puzzle={puzzle} setPuzzle={setPuzzle} />
        ) : (
          <SolveMode puzzle={puzzle} />
        )}
      </main>
    </div>
  )
}
