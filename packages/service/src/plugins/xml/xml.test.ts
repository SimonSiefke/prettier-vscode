import {format} from 'prettier'
import {formatXml} from './xml'

test('format xml', () => {
  expect(
    formatXml(format)(
      `
<test />`,
      {
        filepath: 'index.xml'
      }
    )
  ).toBe(`<test />
`)
})
