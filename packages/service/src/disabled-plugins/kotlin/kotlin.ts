import * as kotlin from 'prettier-plugin-kotlin'
import {Format} from '../../plugins/pluginApi'
// TODO this throws a java illegalstate exception
export const formatKotlin: Format = format => (text, options) =>
  format(text, {...options, plugins: [kotlin]})
