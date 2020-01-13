import {format} from 'prettier'
import {formatLess} from './less'

test('format less', () => {
  expect(
    formatLess(format)(`h1{font-size:10px;}`, {
      filepath: 'index.less'
    })
  ).toBe(`h1 {
  font-size: 10px;
}
`)
})
