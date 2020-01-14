import { format } from 'prettier'
import { formatTypescript } from './typescript'

test('format typescript', () => {
  expect(
    formatTypescript(format)(`   let x`, {
      filepath: 'index.ts',
    })
  ).toBe(`let x;
`)
})
