import {Formatter} from '../pluginApi'

export const formatPostcss: Formatter = format => (text, options) =>
  format(text, options)
