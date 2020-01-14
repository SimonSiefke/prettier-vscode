import * as twig from 'prettier-plugin-twig-melody'
import { Formatter } from '../pluginApi'

export const formatTwig: Formatter = format => (text, options) =>
  format(text, { ...options, plugins: [twig] })
