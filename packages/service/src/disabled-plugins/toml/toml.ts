import * as toml from 'prettier-plugin-toml'
import { Formatter } from '../../plugins/pluginApi'

export const formatToml: Formatter = format => (text, options) =>
  format(text, { ...options, plugins: [toml] })
