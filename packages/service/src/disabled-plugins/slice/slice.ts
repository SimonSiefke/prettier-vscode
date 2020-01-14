import * as slice from 'prettier-plugin-slice'
import { Formatter } from '../../plugins/pluginApi'

// TODO Unexpected character '#'
export const formatSlice: Formatter = format => (text, options) =>
  format(text, { ...options, plugins: [slice] })
