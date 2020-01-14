import * as csharp from 'prettier-plugin-csharp'
import { Formatter } from '../pluginApi'

export const formatCsharp: Formatter = format => (text, options) =>
  format(text, { ...options, plugins: [csharp] })
