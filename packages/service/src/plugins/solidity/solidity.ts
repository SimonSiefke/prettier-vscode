import * as solidity from 'prettier-plugin-solidity'
import {Format} from '../pluginApi'

export const formatSolidity: Format = format => (text, options) =>
  format(text, {...options, plugins: [solidity]})
