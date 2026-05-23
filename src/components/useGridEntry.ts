import {
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from 'react'
import {
  deriveSlots,
  sameCoord,
  slotIndexOf,
  slotsForCell,
  stepInSlot,
  type Slot,
} from '../logic'
import {
  getCell,
  isClueCell,
  isInBounds,
  isLetterCell,
  isValidLetter,
  type Coord,
  type Direction,
  type Puzzle,
} from '../model'
import { scrollCellIntoView } from './gridScroll'

const ARROW_DELTAS: Record<string, Coord> = {
  ArrowUp: { row: -1, col: 0 },
  ArrowDown: { row: 1, col: 0 },
  ArrowLeft: { row: 0, col: -1 },
  ArrowRight: { row: 0, col: 1 },
}

interface UseGridEntryOptions {
  puzzle: Puzzle
  gridRef: { current: HTMLDivElement | null }
  /** Current letter at a cell ('' for non-letter or empty cells). */
  getLetter: (coord: Coord) => string
  /** Write a letter (already a single uppercase letter, or '' to clear). */
  setLetter: (coord: Coord, letter: string) => void
  /**
   * Solve mode: clicking a clue cell focuses the start of its answer (and sets
   * the typing direction), toggling between the two answers on re-click.
   * Build mode (default false): clicking a clue cell selects the clue cell
   * itself so its editor can open.
   */
  focusAnswerOnClueClick?: boolean
}

export interface GridEntry {
  selected: Coord | null
  setSelected: (coord: Coord | null) => void
  direction: Direction
  /** Active word slot through (or owned by) the selected cell, if any. */
  activeSlot: Slot | undefined
  /** All slots derived from the puzzle (shared so callers needn't re-derive). */
  slots: Slot[]
  /** Click handler: select a cell, or toggle direction if already selected. */
  selectCell: (coord: Coord) => void
  /** Key handler for nav/typing. Returns true if it consumed the event. */
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => boolean
  /**
   * Input handler for the hidden proxy `<input>` — the mobile path. Soft
   * keyboards don't fire reliable `keydown` for letters (Android IME sends
   * keyCode 229), so we also read typed characters from the input event.
   */
  handleInput: (event: FormEvent<HTMLDivElement>) => void
  /**
   * Ref for the hidden proxy `<input>`. Focusing a real input is what opens the
   * mobile soft keyboard; tapping a cell focuses it. Render it in the grid
   * container so its key/input events bubble to the container handlers.
   */
  inputRef: RefObject<HTMLInputElement>
}

/**
 * Shared grid selection + keyboard entry for build and solve modes.
 * - Arrow keys move the selection (keeping it scrolled into view).
 * - Typing a Finnish letter on a letter cell writes it (via setLetter) and
 *   advances along the active slot.
 * - Backspace clears the current letter, or steps back and clears.
 * - Clicking the selected cell again toggles across/down.
 * The letter source/sink is injected, so build writes solutions and solve
 * writes the solver's entries.
 */
export function useGridEntry({
  puzzle,
  gridRef,
  getLetter,
  setLetter,
  focusAnswerOnClueClick = false,
}: UseGridEntryOptions): GridEntry {
  const [selected, setSelected] = useState<Coord | null>(null)
  const [direction, setDirection] = useState<Direction>('across')
  const inputRef = useRef<HTMLInputElement>(null)

  const slots = useMemo(() => deriveSlots(puzzle), [puzzle])

  // Prefer a slot through the selected cell in the current direction, else any
  // through it, else one the cell *owns* (a selected clue cell).
  const activeSlot = useMemo(() => {
    if (!selected) return undefined
    const candidates = [
      ...slotsForCell(slots, selected),
      ...slots.filter((s) => sameCoord(s.clueCoord, selected)),
    ]
    return candidates.find((s) => s.direction === direction) ?? candidates[0]
  }, [selected, direction, slots])

  function selectByKeyboard(coord: Coord) {
    setSelected(coord)
    scrollCellIntoView(gridRef.current, coord)
  }

  function selectCell(coord: Coord) {
    const sel = selected
    const cell = getCell(puzzle, coord)

    // Solve mode: a clue click jumps to its answer's start (toggling on re-click).
    if (focusAnswerOnClueClick && cell && isClueCell(cell)) {
      const owned = slots.filter(
        (s) => sameCoord(s.clueCoord, coord) && s.cells.length > 0,
      )
      if (owned.length > 0) {
        let inCurrentAnswer = false
        if (sel) {
          inCurrentAnswer = owned.some(
            (s) => s.direction === direction && slotIndexOf(s, sel) >= 0,
          )
        }
        const target =
          inCurrentAnswer && owned.length > 1
            ? (owned.find((s) => s.direction !== direction) ?? owned[0])
            : (owned.find((s) => s.direction === direction) ?? owned[0])
        setDirection(target.direction)
        setSelected(target.cells[0])
        inputRef.current?.focus()
        return
      }
    }

    // Letter/blocked (or clue when not focusing answers): select; re-click
    // toggles the active across/down direction.
    if (sel && sameCoord(sel, coord)) {
      setDirection((d) => (d === 'across' ? 'down' : 'across'))
    } else {
      setSelected(coord)
    }
    inputRef.current?.focus()
  }

  // ---- Shared entry logic (used by both the key and input handlers) ----

  /** Write `ch` if the selected cell is a letter cell, then advance the slot. */
  function typeLetter(ch: string): boolean {
    if (!selected) return false
    const cell = getCell(puzzle, selected)
    const upper = ch.toUpperCase()
    if (cell && isLetterCell(cell) && isValidLetter(upper)) {
      setLetter(selected, upper)
      const next = activeSlot && stepInSlot(activeSlot, selected, 1)
      if (next) selectByKeyboard(next)
      return true
    }
    return false
  }

  /** Clear the current letter, or step back along the slot and clear that. */
  function backspace() {
    if (!selected) return
    if (getLetter(selected) !== '') {
      setLetter(selected, '')
    } else if (activeSlot) {
      const prev = stepInSlot(activeSlot, selected, -1)
      if (prev) {
        selectByKeyboard(prev)
        setLetter(prev, '')
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): boolean {
    if (!selected) return false
    const { key } = event

    const delta = ARROW_DELTAS[key]
    if (delta) {
      event.preventDefault()
      const next = {
        row: selected.row + delta.row,
        col: selected.col + delta.col,
      }
      if (isInBounds(puzzle, next)) selectByKeyboard(next)
      return true
    }

    if (key === 'Backspace') {
      event.preventDefault()
      backspace()
      return true
    }

    if (event.ctrlKey || event.metaKey || event.altKey || key.length !== 1) {
      return false
    }

    // A physical letter key (desktop, and iOS soft keyboards). preventDefault
    // stops the proxy input from also receiving it, so there's no double entry.
    if (typeLetter(key)) {
      event.preventDefault()
      return true
    }
    return false
  }

  function handleInput(event: FormEvent<HTMLDivElement>) {
    const target = event.target as HTMLInputElement
    if (target !== inputRef.current) return // only the hidden proxy input
    const native = event.nativeEvent as InputEvent
    const value = target.value
    target.value = '' // keep the proxy empty; selection state is our truth
    if (!selected) return
    if (native.inputType === 'deleteContentBackward') {
      backspace()
      return
    }
    // Take the last typed character (handles autocorrect inserting several).
    if (value) typeLetter(value[value.length - 1])
  }

  return {
    selected,
    setSelected,
    direction,
    activeSlot,
    slots,
    selectCell,
    handleKeyDown,
    handleInput,
    inputRef,
  }
}
