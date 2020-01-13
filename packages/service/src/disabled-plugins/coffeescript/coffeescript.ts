import * as csharp from 'prettier-plugin-csharp'
import {Format} from '../../plugins/pluginApi'

// TODO requires https://github.com/prettier/prettier/pull/4462
export const formatCoffeescript: Format = format => (text, options) =>
  format(text, {...options, plugins: [csharp]})
