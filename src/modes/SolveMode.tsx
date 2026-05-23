import { useRef, useState } from 'react'
import { CrosswordGrid } from '../components/CrosswordGrid'
import { useGridEntry } from '../components/useGridEntry'
import { fi } from '../i18n/fi'
import type { Coord, Puzzle } from '../model'

interface SolveModeProps {
  puzzle: Puzzle
}

const keyOf = (coord: Coord) => `${coord.row}-${coord.col}`

export function SolveMode({ puzzle }: SolveModeProps) {
  // Entered letters by `${row}-${col}` key. The puzzle's solution is never
  // shown here; check/reveal against it comes in a later Phase 3 task.
  const [entries, setEntries] = useState<Map<string, string>>(() => new Map())
  const gridRef = useRef<HTMLDivElement>(null)

  const { selected, activeSlot, selectCell, handleKeyDown } = useGridEntry({
    puzzle,
    gridRef,
    focusAnswerOnClueClick: true,
    getLetter: (coord) => entries.get(keyOf(coord)) ?? '',
    setLetter: (coord, letter) =>
      setEntries((prev) => {
        const next = new Map(prev)
        if (letter === '') next.delete(keyOf(coord))
        else next.set(keyOf(coord), letter)
        return next
      }),
  })

  return (
    <section className="solve">
      <header className="solve__head">
        <div className="placeholder__eyebrow">{fi.solve.eyebrow}</div>
        <h2 className="solve__title">{puzzle.title || ' '}</h2>
        <p className="solve__hint">{fi.solve.hint}</p>
      </header>

      <div
        ref={gridRef}
        className="solve__grid"
        tabIndex={0}
        role="application"
        aria-label={fi.solve.gridLabel}
        onKeyDown={handleKeyDown}
      >
        <CrosswordGrid
          puzzle={puzzle}
          showSolutions={false}
          entries={entries}
          selected={selected}
          onSelectCell={selectCell}
          highlighted={activeSlot?.cells ?? []}
        />
      </div>
    </section>
  )
}
