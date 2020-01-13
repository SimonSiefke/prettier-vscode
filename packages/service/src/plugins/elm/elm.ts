import * as elm from 'prettier-plugin-elm'
import { Format } from '../pluginApi'

export const formatElm: Format = format => (text, options) =>
  format(text, { ...options, plugins: [elm] })
