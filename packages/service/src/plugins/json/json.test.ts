import { format } from 'prettier'
import { formatJson } from './json'

test('format json', () => {
  expect(
    formatJson(format)(`   {}`, {
      filepath: 'index.json',
    })
  ).toBe(`{}
`)
})
