import { before, test } from 'mocha'
import { activateExtension, createTestFile, run, TestCase } from '../test-utils'

suite('Format', () => {
  before(async () => {
    await activateExtension()
  })

  const afterCommands = [
    'wait100',
    'editor.action.formatDocument',
    // 'workbench.action.files.saveAll',
  ]

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

  test('html', async () => {
    await createTestFile('index.html')
    const testCases: TestCase[] = [
      {
        input: `   <h1>hello world</h1>`,
        expect: `<h1>hello world</h1>
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('handlebars', async () => {
    await createTestFile('index.hbs')
    const testCases: TestCase[] = [
      {
        input: `   <h1>hello world</h1>`,
        expect: `<h1>
  hello world
</h1>`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('java', async () => {
    await createTestFile('index.java')
    const testCases: TestCase[] = [
      {
        input: `
class HelloWorld {

  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}

`,
        expect: `class HelloWorld {

  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('javascript', async () => {
    await createTestFile('index.js')
    const testCases: TestCase[] = [
      {
        input: `   let x`,
        expect: `let x;
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('javascriptreact', async () => {
    await createTestFile('index.jsx')
    const testCases: TestCase[] = [
      {
        input: `   let x`,
        expect: `let x;
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('json', async () => {
    await createTestFile('index.json')
    const testCases: TestCase[] = [
      {
        input: `  {}`,
        expect: `{}
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('jsonc', async () => {
    await createTestFile('index.json')
    const testCases: TestCase[] = [
      {
        input: `   {} //`,
        expect: `{} //
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('less', async () => {
    await createTestFile('index.less')
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

  test('markdown', async () => {
    await createTestFile('index.md')
    const testCases: TestCase[] = [
      {
        input: ` # hello world`,
        expect: `# hello world
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('mdx', async () => {
    await createTestFile('index.mdx')
    const testCases: TestCase[] = [
      {
        input: ` # hello world`,
        expect: `# hello world
`,
        waitForAutoComplete: 250,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  // test('php', async () => {
  //   await createTestFile('index.php')
  //   const testCases: TestCase[] = [
  //     {
  //       input: `<?php echo '<p>Hello World</p>'; ?>`,
  //       expect: `<?php echo '<p>Hello World</p>'; ?>`,
  //     },
  //   ]
  //   await run(testCases, {
  //     afterCommands,
  //   })
  // })

  test('postcss', async () => {
    await createTestFile('index2.css')
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

  // test('ruby', async () => {
  //   await createTestFile('index.rb')
  //   const testCases: TestCase[] = [
  //     {
  //       input: `   puts 'Hello, world!'`,
  //       expect: `   puts 'Hello, world!'`,
  //     },
  //   ]
  //   await run(testCases, {
  //     afterCommands,
  //   })
  // })

  test('scss', async () => {
    await createTestFile('index.scss')
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

  test.skip('solidity', async () => {
    await createTestFile('index.sol')
    const testCases: TestCase[] = [
      {
        input: `
pragma solidity ^0.4.22;

contract helloWorld {
    function renderHelloWorld() public pure returns (string) {
        return "helloWorld";
    }
}`,
        expect: `pragma solidity ^0.4.22;

contract helloWorld {
    function renderHelloWorld() public pure returns (string) {
        return "helloWorld";
    }
}
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('svelte', async () => {
    await createTestFile('index.svelte')
    const testCases: TestCase[] = [
      {
        input: `   <button> click me</button>`,
        expect: `<button>click me</button>
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('twig', async () => {
    await createTestFile('index.twig')
    const testCases: TestCase[] = [
      {
        input: `
<h1>hello world</h1>`,
        expect: `<h1>
  hello world
</h1>
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('typescript', async () => {
    await createTestFile('index.ts')
    const testCases: TestCase[] = [
      {
        input: `  let x`,
        expect: `let x;
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('typescriptreact', async () => {
    await createTestFile('index.tsx')
    const testCases: TestCase[] = [
      {
        input: `  let x`,
        expect: `let x;
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('vue', async () => {
    await createTestFile('index.vue')
    const testCases: TestCase[] = [
      {
        input: `  <template><h1>hello world</h1></template>`,
        expect: `<template><h1>hello world</h1></template>
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('xml', async () => {
    await createTestFile('index.xml')
    const testCases: TestCase[] = [
      {
        input: `
<test />`,
        expect: `<test />
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('yaml', async () => {
    await createTestFile('index.yml')
    const testCases: TestCase[] = [
      {
        input: `   hello: world`,
        expect: `hello: world
`,
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })

  test('invalid files', async () => {
    await createTestFile('index2.json')
    const testCases: TestCase[] = [
      {
        input: '{;;;}',
        expect: '{;;;}',
      },
    ]
    await run(testCases, {
      afterCommands,
    })
  })
})
