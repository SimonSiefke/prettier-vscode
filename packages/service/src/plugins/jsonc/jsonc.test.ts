import {format} from 'prettier'
import {formatJsonc} from './jsonc'

test('format jsonc', () => {
  expect(
    formatJsonc(format)(`   {} //`, {
      filepath: 'index.json'
    })
  ).toBe(`{} //
`)
})
