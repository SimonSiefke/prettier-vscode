import { formatCss } from './css'
import { format } from 'prettier'

test('format css', () => {
  expect(
    formatCss(format)(`h1{font-size:10px;}`, {
      filepath: 'index.css'
    })
  ).toBe(`h1 {
  font-size: 10px;
}
`)
})
