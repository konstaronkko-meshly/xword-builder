import { useEffect, useMemo, useRef, useState } from 'react'
import { CrosswordGrid } from '../components/CrosswordGrid'
import { useGridEntry } from '../components/useGridEntry'
import { fi } from '../i18n/fi'
import { isComplete, wrongCells } from '../logic'
import { getCell, isLetterCell, type Coord, type Puzzle } from '../model'
import { loadSolveState, saveSolveState } from '../storage'

interface SolveModeProps {
  puzzle: Puzzle
}

const keyOf = (coord: Coord) => `${coord.row}-${coord.col}`
const coordOf = (key: string): Coord => {
  const [row, col] = key.split('-').map(Number)
  return { row, col }
}

export function SolveMode({ puzzle }: SolveModeProps) {
  // Entered letters by `${row}-${col}` key, resumed from localStorage on mount.
  // The puzzle's solution is read only for check/reveal/completion, never shown.
  const [entries, setEntries] = useState<Map<string, string>>(
    () => new Map(Object.entries(loadSolveState(puzzle))),
  )
  const [wrong, setWrong] = useState<Set<string>>(() => new Set())
  const gridRef = useRef<HTMLDivElement>(null)

  // Persist on every change (solve state lives under its own storage key).
  useEffect(() => {
    saveSolveState(puzzle, Object.fromEntries(entries))
  }, [puzzle, entries])

  function setEntry(coord: Coord, letter: string) {
    const key = keyOf(coord)
    setEntries((prev) => {
      const next = new Map(prev)
      if (letter === '') next.delete(key)
      else next.set(key, letter)
      return next
    })
    // Editing a flagged cell clears its "wrong" mark.
    setWrong((prev) => {
      if (!prev.has(key)) return prev
      const next = new Set(prev)
      next.delete(key)
      return next
    })
  }

  const { selected, activeSlot, selectCell, handleKeyDown } = useGridEntry({
    puzzle,
    gridRef,
    focusAnswerOnClueClick: true,
    getLetter: (coord) => entries.get(keyOf(coord)) ?? '',
    setLetter: setEntry,
  })

  const completed = useMemo(
    () => isComplete(puzzle, entries),
    [puzzle, entries],
  )

  function check() {
    setWrong(new Set(wrongCells(puzzle, entries).map(keyOf)))
  }

  function revealCoord(coord: Coord) {
    const cell = getCell(puzzle, coord)
    if (cell && isLetterCell(cell) && cell.solution)
      setEntry(coord, cell.solution)
  }

  function revealLetter() {
    if (selected) revealCoord(selected)
  }

  function revealWord() {
    if (activeSlot) activeSlot.cells.forEach(revealCoord)
  }

  function clearAll() {
    setEntries(new Map())
    setWrong(new Set())
  }

  const selectedCell = selected ? getCell(puzzle, selected) : undefined
  const canRevealLetter = !!selectedCell && isLetterCell(selectedCell)

  return (
    <section className="solve">
      <header className="solve__head">
        <div className="placeholder__eyebrow">{fi.solve.eyebrow}</div>
        <h2 className="solve__title">{puzzle.title || ' '}</h2>
        <p className="solve__hint">{fi.solve.hint}</p>
      </header>

      <div
        className="solve__toolbar"
        role="toolbar"
        aria-label={fi.solve.actions.label}
      >
        <button type="button" className="btn" onClick={check}>
          {fi.solve.actions.check}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          disabled={!canRevealLetter}
          onClick={revealLetter}
        >
          {fi.solve.actions.revealLetter}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          disabled={!activeSlot}
          onClick={revealWord}
        >
          {fi.solve.actions.revealWord}
        </button>
        <button type="button" className="btn btn--ghost" onClick={clearAll}>
          {fi.solve.actions.clear}
        </button>
      </div>

      {completed && (
        <div className="solve__done">{fi.solve.actions.completed}</div>
      )}

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
          wrong={[...wrong].map(coordOf)}
        />
      </div>
    </section>
  )
}
