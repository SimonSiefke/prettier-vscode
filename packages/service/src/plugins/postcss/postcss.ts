import {Format} from '../pluginApi'

export const formatPostcss: Format = format => (text, options) =>
  format(text, options)
