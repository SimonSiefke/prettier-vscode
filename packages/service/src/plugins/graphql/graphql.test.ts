import { format } from 'prettier'
import { formatGraphql } from './graphql'

test('format graphql', () => {
  expect(
    formatGraphql(format)(
      `   type Person {
  name: String
}`,
      {
        filepath: 'index.gql',
      }
    )
  ).toBe(`type Person {
  name: String
}
`)
})
