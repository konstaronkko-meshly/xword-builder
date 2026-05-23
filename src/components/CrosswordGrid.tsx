import {
  isBlockedCell,
  isClueCell,
  isLetterCell,
  type Arrow,
  type Cell,
  type Puzzle,
} from '../model'
import './CrosswordGrid.css'

/** Glyph drawn for each arrow kind (bent arrows included for completeness). */
const ARROW_GLYPH: Record<Arrow, string> = {
  right: '→',
  down: '↓',
  'down-then-right': '↳',
  'right-then-down': '⤵',
}

interface CrosswordGridProps {
  puzzle: Puzzle
  /** Pixel size of each square cell (default 48). */
  cellSize?: number
}

/**
 * Renders a puzzle as an equal-size square matrix. Pure presentation driven by
 * the model — letter, clue (text + arrows), and blocked cells. Hairline
 * gridlines come from a 1px gap over a dark background (no per-cell borders).
 */
export function CrosswordGrid({ puzzle, cellSize = 48 }: CrosswordGridProps) {
  return (
    <div
      className="xgrid"
      role="grid"
      aria-label={puzzle.title || undefined}
      style={
        {
          gridTemplateColumns: `repeat(${puzzle.cols}, var(--xgrid-cell))`,
          '--xgrid-cell': `${cellSize}px`,
        } as React.CSSProperties
      }
    >
      {puzzle.cells.flatMap((row, r) =>
        row.map((cell, c) => <CellView key={`${r}-${c}`} cell={cell} />),
      )}
    </div>
  )
}

function CellView({ cell }: { cell: Cell }) {
  if (isBlockedCell(cell)) {
    return <div className="xcell xcell--blocked" role="gridcell" />
  }

  if (isClueCell(cell)) {
    return (
      <div className="xcell xcell--clue" role="gridcell">
        {cell.clues.map((clue, i) => (
          <span className="xcell__clue" key={i}>
            <span className="xcell__arrow">{ARROW_GLYPH[clue.arrow]}</span>
            <span className="xcell__text">{clue.text}</span>
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="xcell xcell--letter" role="gridcell">
      {isLetterCell(cell) ? cell.solution : ''}
    </div>
  )
}
