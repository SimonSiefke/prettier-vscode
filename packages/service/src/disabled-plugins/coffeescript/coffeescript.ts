import * as csharp from 'prettier-plugin-csharp'
import {Formatter} from '../../plugins/pluginApi'

// TODO requires https://github.com/prettier/prettier/pull/4462
export const formatCoffeescript: Formatter = format => (text, options) =>
  format(text, {...options, plugins: [csharp]})
