// One-time UI preference flags (not tied to any puzzle). Mirrors the
// xword: namespacing of the puzzle/solve storage helpers.

const PREF_PREFIX = 'xword:pref:'
const HELP_SEEN_KEY = `${PREF_PREFIX}help-seen`

/** Whether the user has already seen (or dismissed) the first-run help nudge. */
export function hasSeenHelp(
  storage: Storage = globalThis.localStorage,
): boolean {
  try {
    return storage.getItem(HELP_SEEN_KEY) === '1'
  } catch {
    return false // storage disabled (e.g. private mode) — just show the nudge
  }
}

/** Remember that the help nudge was seen — dismissed, or Ohje was opened. */
export function markHelpSeen(storage: Storage = globalThis.localStorage): void {
  try {
    storage.setItem(HELP_SEEN_KEY, '1')
  } catch {
    // ignore — nothing to persist to
  }
}
