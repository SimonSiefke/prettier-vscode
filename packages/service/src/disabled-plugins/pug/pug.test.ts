import {format} from 'prettier'
import {formatPug} from './pug'

test.skip('format pug', () => {
  expect(
    formatPug(format)(
      `


a(href=link)
`,
      {
        filepath: 'index.pug'
      }
    )
  ).toBe(`
a(href=link)
`)
})
