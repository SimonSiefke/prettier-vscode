[![travis build](https://img.shields.io/travis/com/SimonSiefke/vscode-svg-preview.svg)](https://travis-ci.com/SimonSiefke/vscode-svg-preview) [![Version](https://vsmarketplacebadge.apphb.com/version/SimonSiefke.svg-preview.svg)](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

# Prettier for VSCode

<!-- TODO demo image -->

<!-- TODO update badge -->

## Differences to the official prettier extension

|                                                                                                                                  | This extension | [Official Prettier Extension](https://github.com/prettier/prettier-vscode) |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| Out of the box support for JavaScript, TypeScript, Flow, JSX, JSON, CSS, SCSS, Less, HTML, Vue, Angular, GraphQL, Markdown, YAML | ✅             | ✅                                                                         |
| Out of the box support for C#, Elm, Java, Svelte, Twig, XML                                                                      | ✅             |                                                                            |
| Works without `npm install`                                                                                                      | ✅             |                                                                            |
| Activates lazily                                                                                                                 | ✅             |                                                                            |
| Implemented as a language server so that it never slows down VSCode                                                              | ✅             |                                                                            |
| More configuration options                                                                                                       |                | ✅                                                                         |
| Less configuration options, more opinionated                                                                                     | ✅             |                                                                            |

## Settings

| Property                    | Description          | Default                                                                                                                                                                                                                                                          |
| --------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prettier.enabledLanguageIds | Enabled language ids | `["csharp", "css", "elm", "flow", "graphql", "html", "java","javascript", "javascriptreact", "json", "jsonc", "less", "markdown", "mdx", "php", "postcss", "ruby", "scss", "solidity", "svelte", "typescript", "typescriptreact", "twig", "vue", "xml", "yaml"]` |

<!--
## Supported Languages

- Angular
- C#
- CSS
- Elm
- Flow
- GraphQL
- HTML
- Java
- JavaScript / JSX
- JSON / JSONC
- LESS
- Markdown
- MDX
- Php
- PostCSS
- Ruby
- SCSS
- Solidity
- Svelte
- TypeScript / TSX
- Twig
- Vue
- XML
- YAML -->
