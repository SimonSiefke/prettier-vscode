import * as pug from '@prettier/plugin-pug'
import { Formatter } from '../../plugins/pluginApi'

// TODO this prints a lot of debug messages
export const formatPug: Formatter = format => (text, options) =>
  format(text, { ...options, plugins: [pug] })
