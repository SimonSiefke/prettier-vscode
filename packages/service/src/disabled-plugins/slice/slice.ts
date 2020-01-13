import * as slice from 'prettier-plugin-slice'
import {Format} from '../../plugins/pluginApi'

// TODO Unexpected character '#'
export const formatSlice: Format = format => (text, options) =>
  format(text, {...options, plugins: [slice]})
