import { useEffect, useMemo, useRef, useState } from 'react'
import { CrosswordGrid } from '../components/CrosswordGrid'
import { useGridEntry } from '../components/useGridEntry'
import { fi } from '../i18n/fi'
import { isComplete, solutionWordCells, wrongCells } from '../logic'
import { getCell, isLetterCell, type Coord, type Puzzle } from '../model'
import {
  loadSolveState,
  loadSolveTimer,
  saveSolveState,
  saveSolveTimer,
} from '../storage'

interface SolveModeProps {
  puzzle: Puzzle
}

const keyOf = (coord: Coord) => `${coord.row}-${coord.col}`
const coordOf = (key: string): Coord => {
  const [row, col] = key.split('-').map(Number)
  return { row, col }
}

/** Format seconds as mm:ss (or h:mm:ss past an hour). */
function formatTime(totalSec: number): string {
  const s = totalSec % 60
  const m = Math.floor(totalSec / 60) % 60
  const h = Math.floor(totalSec / 3600)
  const mm = `${m}`.padStart(2, '0')
  const ss = `${s}`.padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

export function SolveMode({ puzzle }: SolveModeProps) {
  // Entered letters by `${row}-${col}` key, resumed from localStorage on mount.
  // The puzzle's solution is read only for check/reveal/completion, never shown.
  const [entries, setEntries] = useState<Map<string, string>>(
    () => new Map(Object.entries(loadSolveState(puzzle))),
  )
  const [wrong, setWrong] = useState<Set<string>>(() => new Set())
  // Solve timer (resumed from its own storage key).
  const [timer] = useState(() => loadSolveTimer(puzzle))
  const [elapsedSec, setElapsedSec] = useState(timer.elapsedSec)
  const [started, setStarted] = useState(timer.started)
  const gridRef = useRef<HTMLDivElement>(null)

  // Persist on every change (solve state lives under its own storage key).
  useEffect(() => {
    saveSolveState(puzzle, Object.fromEntries(entries))
  }, [puzzle, entries])

  function setEntry(coord: Coord, letter: string) {
    const key = keyOf(coord)
    setStarted(true) // first interaction starts the timer
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

  const {
    selected,
    activeSlot,
    selectCell,
    handleKeyDown,
    handleInput,
    inputRef,
    slots,
  } = useGridEntry({
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

  // The timer runs once started and until the puzzle is correctly completed.
  const timerActive = started && !completed

  useEffect(() => {
    if (!timerActive) return
    const id = setInterval(() => setElapsedSec((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [timerActive])

  // Persist timer state (separate key) whenever it changes.
  useEffect(() => {
    saveSolveTimer(puzzle, { elapsedSec, started })
  }, [puzzle, elapsedSec, started])

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
    setElapsedSec(0)
    setStarted(false)
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
        <span className="solve__timer">
          {fi.solve.timer.label}: {formatTime(elapsedSec)}
        </span>
      </div>

      {completed && (
        <div className="solve__done">
          {fi.solve.actions.completed} {fi.solve.timer.label}{' '}
          {formatTime(elapsedSec)}.
        </div>
      )}

      <div
        ref={gridRef}
        className="solve__grid"
        role="application"
        aria-label={fi.solve.gridLabel}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      >
        <input
          ref={inputRef}
          className="grid-input"
          aria-label={fi.solve.gridLabel}
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <CrosswordGrid
          puzzle={puzzle}
          showSolutions={false}
          entries={entries}
          selected={selected}
          onSelectCell={selectCell}
          highlighted={activeSlot?.cells ?? []}
          wrong={[...wrong].map(coordOf)}
          solutionCells={solutionWordCells(slots)}
        />
      </div>
    </section>
  )
}
