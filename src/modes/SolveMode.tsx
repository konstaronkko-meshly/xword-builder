import { useState } from 'react'
import { CrosswordGrid } from '../components/CrosswordGrid'
import { fi } from '../i18n/fi'
import type { Puzzle } from '../model'

interface SolveModeProps {
  puzzle: Puzzle
}

export function SolveMode({ puzzle }: SolveModeProps) {
  // Entered letters by `${row}-${col}` key. Filling them in (keyboard nav,
  // check/reveal) arrives in the next Phase 3 tasks; for now letter cells
  // render empty. The puzzle's solution is never shown here.
  const [entries] = useState<Map<string, string>>(() => new Map())

  return (
    <section className="solve">
      <header className="solve__head">
        <div className="placeholder__eyebrow">{fi.solve.eyebrow}</div>
        <h2 className="solve__title">{puzzle.title || ' '}</h2>
        <p className="solve__hint">{fi.solve.hint}</p>
      </header>

      <div className="solve__grid" aria-label={fi.solve.gridLabel}>
        <CrosswordGrid
          puzzle={puzzle}
          showSolutions={false}
          entries={entries}
        />
      </div>
    </section>
  )
}
