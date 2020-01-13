import {format} from 'prettier'
import {formatSolidity} from './solidity'

test('format solidity', () => {
  expect(
    formatSolidity(format)(
      `
pragma solidity ^0.4.22;

contract helloWorld {
    function renderHelloWorld() public pure returns (string) {
        return "helloWorld";
    }
}
`,
      {
        filepath: 'index.sol'
      }
    )
  ).toBe(`pragma solidity ^0.4.22;

contract helloWorld {
    function renderHelloWorld() public pure returns (string) {
        return "helloWorld";
    }
}
`)
})
