import { useRef, useState, type KeyboardEvent } from 'react'
import { CrosswordGrid } from '../components/CrosswordGrid'
import { createSamplePuzzle } from '../fixtures/samplePuzzle'
import { fi } from '../i18n/fi'
import { deriveSlots } from '../logic'
import { isInBounds, setCellType, type CellType, type Coord } from '../model'

const CELL_TYPES: readonly CellType[] = ['letter', 'clue', 'blocked']

export function BuildMode() {
  const [puzzle, setPuzzle] = useState(createSamplePuzzle)
  const [selected, setSelected] = useState<Coord | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const slotCount = deriveSlots(puzzle).length

  function applyType(type: CellType) {
    if (selected) setPuzzle((p) => setCellType(p, selected, type))
  }

  function selectCell(coord: Coord) {
    setSelected(coord)
    gridRef.current?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!selected) return
    const deltas: Record<string, Coord> = {
      ArrowUp: { row: selected.row - 1, col: selected.col },
      ArrowDown: { row: selected.row + 1, col: selected.col },
      ArrowLeft: { row: selected.row, col: selected.col - 1 },
      ArrowRight: { row: selected.row, col: selected.col + 1 },
    }
    const next = deltas[event.key]
    if (next) {
      event.preventDefault()
      if (isInBounds(puzzle, next)) setSelected(next)
      return
    }
    const typeIndex = ['1', '2', '3'].indexOf(event.key)
    if (typeIndex >= 0) {
      event.preventDefault()
      applyType(CELL_TYPES[typeIndex])
    }
  }

  return (
    <section className="build">
      <header className="build__head">
        <div className="placeholder__eyebrow">{fi.build.eyebrow}</div>
        <h2 className="build__title">{puzzle.title}</h2>
        <p className="build__hint">{fi.build.editHint}</p>
      </header>

      <div
        className="build__toolbar"
        role="toolbar"
        aria-label={fi.build.tools.label}
      >
        {CELL_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className="btn"
            disabled={!selected}
            onClick={() => applyType(type)}
          >
            {fi.build.tools[type]}
          </button>
        ))}
        <span className="build__status">
          {fi.build.tools.slots}: {slotCount}
        </span>
      </div>

      <div
        ref={gridRef}
        className="build__grid"
        tabIndex={0}
        role="application"
        aria-label={fi.build.tools.gridLabel}
        onKeyDown={handleKeyDown}
      >
        <CrosswordGrid
          puzzle={puzzle}
          selected={selected}
          onSelectCell={selectCell}
        />
      </div>
    </section>
  )
}
