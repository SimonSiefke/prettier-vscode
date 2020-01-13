import {format} from 'prettier'
import {formatScss} from './scss'

test('format scss', () => {
  expect(
    formatScss(format)(`h1{font-size:10px;}`, {
      filepath: 'index.scss'
    })
  ).toBe(`h1 {
  font-size: 10px;
}
`)
})
