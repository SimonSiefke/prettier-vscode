import * as solidity from 'prettier-plugin-solidity'
import {Formatter} from '../pluginApi'

export const formatSolidity: Formatter = format => (text, options) =>
  format(text, {...options, plugins: [solidity]})
