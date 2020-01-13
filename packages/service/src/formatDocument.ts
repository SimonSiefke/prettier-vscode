import {format, Options} from 'prettier'
import {Format} from './plugins/pluginApi'

const DEFAULT_OPTIONS: Options = {
  htmlWhitespaceSensitivity: 'ignore',
  arrowParens: 'avoid',
  semi: false,
  trailingComma: 'all',
  singleQuote: true
}

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

const FORMATTING_MAP: {[key: string]: () => Promise<Format>} = {
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

export const preloadFormatter: (languageId: string) => Promise<void> = (() => {
  const preloadedMap: Set<string> = new Set()
  return async (languageId: string) => {
    if (preloadedMap.has(languageId)) {
      return
    }
    if (!FORMATTING_MAP[languageId]) {
      return
    }
    preloadedMap.add(languageId)
    const formatter = await FORMATTING_MAP[languageId]()
    formatter(format)('', {
      filepath: `index.${EXTENSION_MAP[languageId]}`
    })
  }
})()

export const formatDocument: (
  text: string,
  documentUri: string,
  languageId: string
) => Promise<string | undefined> = async (text, documentUri, languageId) => {
  if (!FORMATTING_MAP[languageId]) {
    return undefined
  }
  const formatLanguage = await FORMATTING_MAP[languageId]()
  return formatLanguage(format)(text, {
    ...DEFAULT_OPTIONS,
    filepath: documentUri
  })
}
