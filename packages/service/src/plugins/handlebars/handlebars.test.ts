import { format } from 'prettier'
import { formatHandlebars } from './handlebars'

test('format handlebars', () => {
  expect(
    formatHandlebars(format)(`   <h1>hello world</h1>`, {
      filepath: 'index.hbs',
    })
  ).toBe(`<h1>
  hello world
</h1>`)
})
