import * as php from '@prettier/plugin-php'
import {Format} from '../pluginApi'

// TODO pending support for formatting html/css/js inside php https://github.com/prettier/plugin-php/issues/846
export const formatPhp: Format = format => (text, options) =>
  format(text, {...options, plugins: [php]})
