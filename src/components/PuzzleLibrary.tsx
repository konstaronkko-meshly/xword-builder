import { useRef, useState, type DragEvent } from 'react'
import { fi } from '../i18n/fi'
import type { PuzzleSummary } from '../storage'
import './PuzzleLibrary.css'

interface PuzzleLibraryProps {
  saved: PuzzleSummary[]
  currentTitle: string
  importError: string | null
  onSaveCurrent: () => void
  onExportCurrent: () => void
  onNew: () => void
  onImport: (file: File) => void
  onOpen: (id: string) => void
  onDuplicate: (id: string) => void
  onRename: (id: string) => void
  onDelete: (id: string) => void
  onExport: (id: string) => void
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('fi-FI')
}

export function PuzzleLibrary({
  saved,
  currentTitle,
  importError,
  onSaveCurrent,
  onExportCurrent,
  onNew,
  onImport,
  onOpen,
  onDuplicate,
  onRename,
  onDelete,
  onExport,
}: PuzzleLibraryProps) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer.files[0]
    if (file) onImport(file)
  }

  return (
    <section className="library">
      <div className="placeholder__eyebrow">{fi.library.title}</div>

      <div className="library__current">
        <h2 className="library__heading">{fi.library.current}</h2>
        <p className="library__current-title">
          {currentTitle || fi.library.untitled}
        </p>
        <div className="library__row-actions">
          <button type="button" className="btn" onClick={onSaveCurrent}>
            {fi.library.save}
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onExportCurrent}
          >
            {fi.library.export}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onNew}>
            {fi.library.newPuzzle}
          </button>
        </div>
      </div>

      <div className="library__import">
        <h2 className="library__heading">{fi.library.importTitle}</h2>
        <div
          className={`dropzone${dragOver ? ' is-over' : ''}`}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInput.current?.click()}
          role="button"
          tabIndex={0}
        >
          {fi.library.importHint}
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="dropzone__input"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onImport(file)
              e.target.value = '' // allow re-importing the same file
            }}
          />
        </div>
        {importError && (
          <p className="library__error" role="alert">
            {fi.library.importError}
          </p>
        )}
      </div>

      <div className="library__saved">
        <h2 className="library__heading">{fi.library.saved}</h2>
        {saved.length === 0 ? (
          <p className="library__empty">{fi.library.empty}</p>
        ) : (
          <ul className="library__list">
            {saved.map((p) => (
              <li className="library__item" key={p.id}>
                <div className="library__item-info">
                  <span className="library__item-title">
                    {p.title || fi.library.untitled}
                  </span>
                  <span className="library__item-date">
                    {formatDate(p.savedAt)}
                  </span>
                </div>
                <div className="library__row-actions">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => onOpen(p.id)}
                  >
                    {fi.library.open}
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => onDuplicate(p.id)}
                  >
                    {fi.library.duplicate}
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => onRename(p.id)}
                  >
                    {fi.library.rename}
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => onExport(p.id)}
                  >
                    {fi.library.export}
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => onDelete(p.id)}
                  >
                    {fi.library.delete}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
