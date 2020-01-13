import * as pug from '@prettier/plugin-pug'
import {Format} from '../../plugins/pluginApi'

// TODO this prints a lot of debug messages
export const formatPug: Format = format => (text, options) =>
  format(text, {...options, plugins: [pug]})
