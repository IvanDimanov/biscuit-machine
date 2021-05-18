const fs = require('fs')
const JSON5 = require('json5')

const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cracoAlias = require('craco-alias')

const tsconfigString = fs.readFileSync('./tsconfig.extended.json')
const tsconfig = JSON5.parse(tsconfigString)

const cracoBaseUrl = tsconfig.compilerOptions.baseUrl
const cracoAliases = Object.keys(tsconfig.compilerOptions.paths)
  .map((key) => {
    const alias = key.replace('/*', '')
    const path = tsconfig.compilerOptions.paths[key][0].replace('*', '')

    return {
      [alias]: path,
    }
  })
  .reduce((aliases, alias) => ({ ...aliases, ...alias }), {})


module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },

  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'options',
        baseUrl: cracoBaseUrl,
        aliases: cracoAliases,
      },
    },
  ],
}
