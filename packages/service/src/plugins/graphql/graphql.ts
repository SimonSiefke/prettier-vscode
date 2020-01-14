import { Formatter } from '../pluginApi'

export const formatGraphql: Formatter = format => (text, options) =>
  format(text, options)
