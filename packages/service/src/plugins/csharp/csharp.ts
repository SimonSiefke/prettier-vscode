import * as csharp from 'prettier-plugin-csharp'
import {Format} from '../pluginApi'

export const formatCsharp: Format = format => (text, options) =>
  format(text, {...options, plugins: [csharp]})
