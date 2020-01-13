import { format } from 'prettier'
import { formatVue } from './vue'

test('format vue', () => {
  expect(
    formatVue(format)(`   <template><h1>hello world</h1></template>`, {
      filepath: 'index.vue'
    })
  ).toBe(`<template><h1>hello world</h1></template>
`)
})
