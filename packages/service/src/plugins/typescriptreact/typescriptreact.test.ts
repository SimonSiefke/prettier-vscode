import { format } from 'prettier'
import { formatTypescriptreact } from './typescriptreact'

test('format typescriptreact', () => {
  expect(
    formatTypescriptreact(format)(`   let x`, {
      filepath: 'index.tsx',
    })
  ).toBe(`let x;
`)
})
