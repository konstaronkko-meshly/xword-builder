import { fi } from '../i18n/fi'

export type Mode = 'build' | 'solve'

interface ModeToggleProps {
  mode: Mode
  onChange: (mode: Mode) => void
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="mode-toggle" role="tablist" aria-label={fi.appTagline}>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'build'}
        className={`mode-toggle__btn${mode === 'build' ? ' is-active' : ''}`}
        onClick={() => onChange('build')}
      >
        {fi.mode.build}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'solve'}
        className={`mode-toggle__btn${mode === 'solve' ? ' is-active' : ''}`}
        onClick={() => onChange('solve')}
      >
        {fi.mode.solve}
      </button>
    </div>
  )
}
