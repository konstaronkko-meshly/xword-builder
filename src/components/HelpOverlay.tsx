import { useEffect } from 'react'
import { fi } from '../i18n/fi'
import { Legend } from './Legend'
import './HelpOverlay.css'

interface HelpOverlayProps {
  onClose: () => void
}

const h = fi.help

/** A paragraph section (body is one string or several). */
function Prose({
  title,
  body,
}: {
  title: string
  body: string | readonly string[]
}) {
  const paragraphs = Array.isArray(body) ? body : [body]
  return (
    <section className="help__section">
      <h3 className="help__heading">{title}</h3>
      {paragraphs.map((p, i) => (
        <p className="help__text" key={i}>
          {p}
        </p>
      ))}
    </section>
  )
}

/**
 * The "Ohje" help overlay — the hub for in-app guidance. A dismissible dialog
 * (Esc, backdrop click, or close button) reachable from the header. The legend
 * (Symbolit) is a placeholder here; a later task fills it with real swatches.
 * Mirrors the PrintView overlay pattern.
 */
export function HelpOverlay({ onClose }: HelpOverlayProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="help-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={h.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="help-panel">
        <div className="help-panel__bar">
          <h2 className="help-panel__title">{h.title}</h2>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            {h.close}
          </button>
        </div>

        <div className="help-panel__body">
          <Prose title={h.building.title} body={h.building.body} />
          <Prose title={h.solving.title} body={h.solving.body} />

          <section className="help__section">
            <h3 className="help__heading">{h.keyboard.title}</h3>
            <dl className="help__keys">
              {h.keyboard.items.map(([key, desc]) => (
                <div className="help__key" key={key}>
                  <dt>{key}</dt>
                  <dd>{desc}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="help__section">
            <h3 className="help__heading">{h.symbols.title}</h3>
            <p className="help__text">{h.symbols.intro}</p>
            <Legend />
          </section>

          <Prose title={h.solutionWord.title} body={h.solutionWord.body} />
          <Prose title={h.printing.title} body={h.printing.body} />
        </div>
      </div>
    </div>
  )
}
