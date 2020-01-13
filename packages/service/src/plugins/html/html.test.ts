import {format} from 'prettier'
import {formatHtml} from './html'

test('format html', () => {
  expect(
    formatHtml(format)(`   <h1>hello world</h1>`, {
      filepath: 'index.html'
    })
  ).toBe(`<h1>hello world</h1>
`)
})
