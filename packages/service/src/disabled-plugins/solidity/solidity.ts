import * as solidity from 'prettier-plugin-solidity'
import {Formatter} from '../../plugins/pluginApi'

// TODO currently when this plugin is installed it causes different formatting for js/ts files, e.g.
// without this plugin
// `import { a } from 'a'`
// but with this plugin
// `import {a} from 'a'`

export const formatSolidity: Formatter = format => (text, options) =>
  format(text, {...options, plugins: [solidity]})
