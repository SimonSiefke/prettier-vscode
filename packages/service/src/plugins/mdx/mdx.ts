import {Formatter} from '../pluginApi'

export const formatMdx: Formatter = format => (text, options) =>
  format(text, options)
