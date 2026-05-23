import { useMemo, useState } from 'react'
import { fi } from './i18n/fi'
import { ModeToggle, type Mode } from './components/ModeToggle'
import { PuzzleLibrary } from './components/PuzzleLibrary'
import { PrintView } from './components/PrintView'
import { HelpOverlay } from './components/HelpOverlay'
import { BuildMode } from './modes/BuildMode'
import { SolveMode } from './modes/SolveMode'
import { createDefaultPuzzle } from './fixtures/defaultPuzzle'
import { createEmptyPuzzle } from './model'
import {
  PuzzleParseError,
  PuzzleStore,
  downloadPuzzle,
  readPuzzleFile,
  type PuzzleSummary,
} from './storage'

const NEW_PUZZLE_SIZE = 11

export default function App() {
  const store = useMemo(() => new PuzzleStore(), [])

  // Default to the solver so loading a puzzle never reveals its answers by
  // accident; authoring is an explicit switch to build mode (or "New").
  const [mode, setMode] = useState<Mode>('solve')
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [printOpen, setPrintOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  // The working puzzle (lifted here) and the storage id it was loaded/saved as.
  const [puzzle, setPuzzle] = useState(createDefaultPuzzle)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [saved, setSaved] = useState<PuzzleSummary[]>(() => store.list())
  const [importError, setImportError] = useState<string | null>(null)

  const refresh = () => setSaved(store.list())

  function selectMode(next: Mode) {
    setMode(next)
    setLibraryOpen(false)
  }

  // ---- Library actions ----
  function saveCurrent() {
    const id = store.save(puzzle, currentId ?? undefined)
    setCurrentId(id)
    refresh()
  }

  function exportCurrent() {
    downloadPuzzle(puzzle)
  }

  function newPuzzle() {
    setPuzzle(createEmptyPuzzle(NEW_PUZZLE_SIZE, NEW_PUZZLE_SIZE))
    setCurrentId(null)
    setMode('build')
    setLibraryOpen(false)
  }

  async function importFile(file: File) {
    try {
      const imported = await readPuzzleFile(file)
      setPuzzle(imported)
      setCurrentId(null)
      setImportError(null)
      setMode('solve')
      setLibraryOpen(false)
    } catch (error) {
      setImportError(
        error instanceof PuzzleParseError ? error.message : String(error),
      )
    }
  }

  function openSaved(id: string) {
    const loaded = store.load(id)
    if (!loaded) return
    setPuzzle(loaded)
    setCurrentId(id)
    setMode('solve')
    setLibraryOpen(false)
  }

  function duplicateSaved(id: string) {
    const loaded = store.load(id)
    if (!loaded) return
    store.save({ ...loaded, title: loaded.title + fi.library.copySuffix })
    refresh()
  }

  function renameSaved(id: string) {
    const loaded = store.load(id)
    if (!loaded) return
    const title = window.prompt(fi.library.renamePrompt, loaded.title)
    if (title === null) return
    store.save({ ...loaded, title }, id)
    refresh()
  }

  function deleteSaved(id: string) {
    if (!window.confirm(fi.library.confirmDelete)) return
    store.remove(id)
    if (id === currentId) setCurrentId(null)
    refresh()
  }

  function exportSaved(id: string) {
    const loaded = store.load(id)
    if (loaded) downloadPuzzle(loaded)
  }

  return (
    <>
      <div className="app">
        <header className="app__bar">
          <div className="app__brand">
            <h1 className="app__title">{fi.appTitle}</h1>
            <span className="app__tagline">{fi.appTagline}</span>
          </div>
          <div className="app__nav">
            <ModeToggle mode={mode} onChange={selectMode} />
            <button
              type="button"
              className={`mode-toggle__btn mode-toggle__btn--solo${libraryOpen ? ' is-active' : ''}`}
              aria-pressed={libraryOpen}
              onClick={() => setLibraryOpen(true)}
            >
              {fi.mode.library}
            </button>
            <button
              type="button"
              className="mode-toggle__btn mode-toggle__btn--solo"
              onClick={() => setPrintOpen(true)}
            >
              {fi.print.button}
            </button>
            <button
              type="button"
              className="mode-toggle__btn mode-toggle__btn--solo"
              onClick={() => setHelpOpen(true)}
            >
              {fi.help.button}
            </button>
          </div>
        </header>

        <main className="app__main">
          {libraryOpen ? (
            <PuzzleLibrary
              saved={saved}
              currentTitle={puzzle.title}
              importError={importError}
              onSaveCurrent={saveCurrent}
              onExportCurrent={exportCurrent}
              onNew={newPuzzle}
              onImport={importFile}
              onOpen={openSaved}
              onDuplicate={duplicateSaved}
              onRename={renameSaved}
              onDelete={deleteSaved}
              onExport={exportSaved}
            />
          ) : mode === 'build' ? (
            <BuildMode puzzle={puzzle} setPuzzle={setPuzzle} />
          ) : (
            <SolveMode puzzle={puzzle} />
          )}
        </main>
      </div>

      {printOpen && (
        <PrintView puzzle={puzzle} onClose={() => setPrintOpen(false)} />
      )}

      {helpOpen && <HelpOverlay onClose={() => setHelpOpen(false)} />}
    </>
  )
}
