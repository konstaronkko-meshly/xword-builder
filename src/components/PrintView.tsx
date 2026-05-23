import { useEffect, useState } from 'react'
import { fi } from '../i18n/fi'
import type { Puzzle } from '../model'
import { CrosswordGrid } from './CrosswordGrid'
import './PrintView.css'

interface PrintViewProps {
  puzzle: Puzzle
  onClose: () => void
}

/**
 * A print overlay: shows the puzzle on a clean white sheet and triggers the
 * browser print dialog (which also covers "Save as PDF"). The "show answers"
 * toggle decides at print time whether letter cells render the solution
 * (answer key) or stay blank for solving on paper. The controls are screen-only
 * — the print stylesheet (PrintView.css) hides the app chrome and the controls,
 * leaving just `.print-sheet`.
 */
export function PrintView({ puzzle, onClose }: PrintViewProps) {
  const [showAnswers, setShowAnswers] = useState(false)

  // Esc closes the overlay (matches the rest of the app's keyboard-first feel).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="print-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={fi.print.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="print-overlay__controls">
        <h2 className="print-overlay__title">{fi.print.title}</h2>
        <label className="print-toggle">
          <input
            type="checkbox"
            checked={showAnswers}
            onChange={(e) => setShowAnswers(e.target.checked)}
          />
          {fi.print.showAnswers}
        </label>
        <button type="button" className="btn" onClick={() => window.print()}>
          {fi.print.print}
        </button>
        <button type="button" className="btn btn--ghost" onClick={onClose}>
          {fi.print.close}
        </button>
      </div>

      <div className="print-sheet">
        <h1 className="print-sheet__title">
          {puzzle.title || fi.library.untitled}
        </h1>
        {showAnswers && (
          <p className="print-sheet__caption">{fi.print.answerKey}</p>
        )}
        <CrosswordGrid puzzle={puzzle} showSolutions={showAnswers} />
      </div>
    </div>
  )
}
