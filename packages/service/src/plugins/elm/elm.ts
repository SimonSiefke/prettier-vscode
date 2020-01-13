import * as elm from 'prettier-plugin-elm'
import { Formatter } from '../pluginApi'

export const formatElm: Formatter = format => (text, options) =>
  format(text, { ...options, plugins: [elm] })
