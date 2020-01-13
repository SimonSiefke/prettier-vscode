import { before, test } from 'mocha'
import { activateExtension, createTestFile, run, TestCase } from '../test-utils'

suite('Format', () => {
  before(async () => {
    await createTestFile('auto-rename-tag.html')
    await activateExtension()
  })

  const afterCommands = ['wait250', 'editor.action.formatDocument', 'wait250']

  test('csharp', async () => {
    await createTestFile('index.cs')
    const testCases: TestCase[] = [
      {
        input: `    using System;`,
        expect: `using System;
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('css', async () => {
    await createTestFile('index.css')
    const testCases: TestCase[] = [
      {
        input: `h1{font-size:10px;}`,
        expect: `h1 {
  font-size: 10px;
}
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('elm', async () => {
    await createTestFile('index.elm')
    const testCases: TestCase[] = [
      {
        input: `
main =
    text "Hello, World!"
`,
        expect: `module Main exposing (main)


main =
    text "Hello, World!"
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('graphql', async () => {
    await createTestFile('index.gql')
    const testCases: TestCase[] = [
      {
        input: `   type Person {
  name: String
}`,
        expect: `type Person {
  name: String
}
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })
})
