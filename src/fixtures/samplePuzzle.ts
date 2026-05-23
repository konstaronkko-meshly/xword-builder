import {
  makeBlockedCell,
  makeClue,
  makeClueCell,
  makeLetterCell,
  type Puzzle,
} from '../model'

const L = (ch: string) => makeLetterCell(ch)
const B = () => makeBlockedCell()

/**
 * A 5×5 demo arrow-word for previewing the grid before the build editor
 * exists. Showcases all three cell types, both arrow directions, and a
 * two-clue cell: across KISA ("Kilpailu") and down VESI ("Neste").
 * Not a fully connected/validated puzzle — purely for visual preview.
 */
export function createSamplePuzzle(): Puzzle {
  return {
    title: 'Esimerkkiristikko',
    rows: 5,
    cols: 5,
    cells: [
      [
        makeClueCell([
          makeClue('Kilpailu', 'across', 'right'),
          makeClue('Neste', 'down', 'down'),
        ]),
        L('K'),
        L('I'),
        L('S'),
        L('A'),
      ],
      [L('V'), B(), B(), B(), L('L')],
      [
        L('E'),
        makeClueCell([makeClue('Tervehdys', 'across', 'right')]),
        L('H'),
        L('E'),
        L('I'),
      ],
      [L('S'), L('O'), B(), B(), L('O')],
      [
        L('I'),
        B(),
        makeClueCell([makeClue('Eläin', 'across', 'right')]),
        L('K'),
        L('O'),
      ],
    ],
  }
}
