const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')


module.exports = ({ config }) => {
  const tsconfigString = fs.readFileSync(path.resolve(__dirname, '../tsconfig.extended.json'))
  const tsconfig = JSON5.parse(tsconfigString)
  
  const { baseUrl, paths } = tsconfig.compilerOptions
  const aliases = Object.keys(paths)
    .map((key) => {
      const alias = key.replace('/*', '')
      const relativePath = tsconfig.compilerOptions.paths[key][0].replace('*', '')
  
      return {
        [alias]: path.resolve(__dirname, '../', baseUrl, relativePath),
      }
    })
    .reduce((aliases, alias) => ({ ...aliases, ...alias }), {})
  
  config.resolve.alias = aliases
  return config
}
