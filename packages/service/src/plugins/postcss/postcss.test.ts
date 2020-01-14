import { format } from 'prettier'
import { formatPostcss } from './postcss'

test('format postcss', () => {
  expect(
    formatPostcss(format)(`h1{font-size:10px;}`, {
      filepath: 'index.css',
    })
  ).toBe(`h1 {
  font-size: 10px;
}
`)
})
