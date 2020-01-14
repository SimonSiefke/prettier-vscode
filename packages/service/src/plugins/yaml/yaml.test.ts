import { format } from 'prettier'
import { formatYaml } from './yaml'

test('format yaml', () => {
  expect(
    formatYaml(format)(`   hello: world`, {
      filepath: 'index.yml',
    })
  ).toBe(`hello: world
`)
})
