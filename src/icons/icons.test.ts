import { describe, expect, it } from 'vitest'
import { ICON_IDS, ICONS, isIconId } from './index'

describe('icon registry', () => {
  it('exposes a non-empty set of icons', () => {
    expect(ICON_IDS.length).toBeGreaterThan(0)
  })

  it('has unique ids', () => {
    expect(new Set(ICON_IDS).size).toBe(ICON_IDS.length)
  })

  it('every icon has a src, a Finnish label, and at least one keyword', () => {
    for (const id of ICON_IDS) {
      const icon = ICONS[id]
      expect(icon.src, id).toBeTruthy()
      expect(icon.label.trim(), id).not.toBe('')
      expect(icon.keywords.length, id).toBeGreaterThan(0)
    }
  })

  it('ICONS keys match ICON_IDS exactly', () => {
    expect(Object.keys(ICONS).sort()).toEqual([...ICON_IDS].sort())
  })

  it('isIconId accepts known ids and rejects unknown ones', () => {
    expect(isIconId(ICON_IDS[0])).toBe(true)
    expect(isIconId('definitely-not-an-icon')).toBe(false)
  })
})
