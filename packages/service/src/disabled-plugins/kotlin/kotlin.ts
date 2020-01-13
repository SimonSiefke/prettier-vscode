import * as kotlin from 'prettier-plugin-kotlin'
import {Formatter} from '../../plugins/pluginApi'
// TODO this throws a java illegalstate exception
export const formatKotlin: Formatter = format => (text, options) =>
  format(text, {...options, plugins: [kotlin]})
