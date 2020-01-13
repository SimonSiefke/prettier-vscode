import {format, getFileInfo, Options, resolveConfig} from 'prettier'
import {Format as Formatter} from './plugins/pluginApi'

const DEFAULT_OPTIONS: Options = {
  htmlWhitespaceSensitivity: 'ignore',
  arrowParens: 'avoid',
  semi: false,
  trailingComma: 'all',
  singleQuote: true
}

const getOptionsCache: {[key: string]: Options} = Object.create(null)
const getOptions: (filePath: string) => Promise<Options> = async filePath => {
  if (!(filePath in getOptionsCache)) {
    let options = (await resolveConfig(filePath)) || DEFAULT_OPTIONS
    options = {...options, filepath: filePath}
    getOptionsCache[filePath] = options
  }
  return getOptionsCache[filePath]
}

const getIsIgnoredCache: {[key: string]: boolean} = Object.create(null)
const getIsIgnored: (filePath: string) => Promise<boolean> = async filePath => {
  if (!(filePath in getIsIgnoredCache)) {
    const fileInfo = await getFileInfo(filePath)
    getIsIgnoredCache[filePath] = fileInfo.ignored
  }
  return getIsIgnoredCache[filePath]
}

/**
 * Used for preloading formatters
 */
const EXTENSION_MAP: {[key: string]: string} = {
  csharp: 'cs',
  css: 'css',
  elm: 'elm',
  flow: 'js',
  graphql: 'gql',
  html: 'html',
  java: 'java',
  javascript: 'js',
  javascriptreact: 'jsx',
  json: 'json',
  jsonc: 'json',
  less: 'less',
  markdown: 'md',
  mdx: 'mdx',
  php: 'php',
  postcss: 'css',
  ruby: 'rb',
  scss: 'scss',
  solidity: 'sol',
  svelte: 'svelte',
  typescript: 'ts',
  typescriptreact: 'tsx',
  twig: 'twig',
  vue: 'vue',
  xml: 'xml',
  yaml: 'yml'
}

const FORMATTING_MAP: {[key: string]: () => Promise<Formatter>} = {
  async csharp() {
    const {formatCsharp} = await import('./plugins/csharp/csharp')
    return formatCsharp
  },
  async css() {
    const {formatCss} = await import('./plugins/css/css')
    return formatCss
  },
  async elm() {
    const {formatElm} = await import('./plugins/elm/elm')
    return formatElm
  },
  async flow() {
    const {formatFlow} = await import('./plugins/flow/flow')
    return formatFlow
  },
  async graphlql() {
    const {formatGraphql} = await import('./plugins/graphql/graphql')
    return formatGraphql
  },
  async html() {
    const {formatHtml} = await import('./plugins/html/html')
    return formatHtml
  },
  async java() {
    const {formatJava} = await import('./plugins/java/java')
    return formatJava
  },
  async javascript() {
    const {formatJavascript} = await import('./plugins/javascript/javascript')
    return formatJavascript
  },
  async javascriptreact() {
    const {formatJavascriptReact} = await import(
      './plugins/javascriptreact/javascriptreact'
    )
    return formatJavascriptReact
  },
  async jsx() {
    return this.javascriptreact()
  },
  async json() {
    const {formatJson} = await import('./plugins/json/json')
    return formatJson
  },
  async jsonc() {
    const {formatJsonc} = await import('./plugins/jsonc/jsonc')
    return formatJsonc
  },
  async less() {
    const {formatLess} = await import('./plugins/less/less')
    return formatLess
  },
  async markdown() {
    const {formatMarkdown} = await import('./plugins/markdown/markdown')
    return formatMarkdown
  },
  async mdx() {
    const {formatMdx} = await import('./plugins/mdx/mdx')
    return formatMdx
  },
  async php() {
    const {formatPhp} = await import('./plugins/php/php')
    return formatPhp
  },
  async postcss() {
    const {formatPostcss} = await import('./plugins/postcss/postcss')
    return formatPostcss
  },
  async ruby() {
    const {formatRuby} = await import('./plugins/ruby/ruby')
    return formatRuby
  },
  async scss() {
    const {formatScss} = await import('./plugins/scss/scss')
    return formatScss
  },
  async solidity() {
    const {formatSolidity} = await import('./plugins/solidity/solidity')
    return formatSolidity
  },
  async svelte() {
    const {formatSvelte} = await import('./plugins/svelte/svelte')
    return formatSvelte
  },
  async typescript() {
    const {formatTypescript} = await import('./plugins/typescript/typescript')
    return formatTypescript
  },
  async tsx() {
    return this.typescriptreact()
  },
  async typescriptreact() {
    const {formatTypescriptreact} = await import(
      './plugins/typescriptreact/typescriptreact'
    )
    return formatTypescriptreact
  },
  async twig() {
    const {formatTwig} = await import('./plugins/twig/twig')
    return formatTwig
  },
  async vue() {
    const {formatVue} = await import('./plugins/vue/vue')
    return formatVue
  },
  async xml() {
    const {formatXml} = await import('./plugins/xml/xml')
    return formatXml
  },
  async yaml() {
    const {formatYaml} = await import('./plugins/yaml/yaml')
    return formatYaml
  }
}

const getFormatterCache: {[key: string]: Formatter | undefined} = Object.create(
  null
)
const getFormatter: (
  languageId: string
) => Promise<Formatter | undefined> = async languageId => {
  if (!(languageId in getFormatterCache)) {
    const formatter = await FORMATTING_MAP[languageId]()
    getFormatterCache[languageId] = formatter
  }
  return getFormatterCache[languageId]
}

const preloadFormatterCache: Set<string> = new Set()
export const preloadFormatter: (
  filePath: string,
  languageId: string
) => Promise<void> = async (filePath: string, languageId: string) => {
  if (preloadFormatterCache.has(filePath)) {
    return
  }
  preloadFormatterCache.add(filePath)
  const formatter = await getFormatter(languageId)
  const isIgnored = await getIsIgnored(filePath)
  const options = await getOptions(filePath)
  if (!formatter) {
    return
  }
  if (isIgnored) {
    return
  }
  formatter(format)('', options)
}

const NULL_FORMATTING_RESULT = undefined

export const formatDocument: (
  text: string,
  filePath: string,
  languageId: string
) => Promise<string | undefined> = async (text, filePath, languageId) => {
  if (!FORMATTING_MAP[languageId]) {
    return NULL_FORMATTING_RESULT
  }
  const isIgnoredPromise = getIsIgnored(filePath)
  const formatLanguagePromise = FORMATTING_MAP[languageId]()
  const optionsPromise = getOptions(filePath)
  // const start = new Date().getTime()
  const [isIgnored, formatLanguage, options] = await Promise.all([
    isIgnoredPromise,
    formatLanguagePromise,
    optionsPromise
  ])
  // console.log('took' + (new Date().getTime() - start))
  if (isIgnored) {
    return NULL_FORMATTING_RESULT
  }
  return formatLanguage(format)(text, options)
}
