const { Transformer } = require('@parcel/plugin')

module.exports = new Transformer({
  async loadConfig({ config }) {
    const loaded = await config.getConfig(['.varsrc.js'])

    if (!loaded) {
      return
    }

    const { filePath, contents } = loaded

    if (filePath.endsWith('.js')) {
      config.invalidateOnStartup()
    }

    const result = []
    for (const key in contents) {
      const value = contents[key]
      const isString = typeof value === 'string'
      result.push({
        name: key,
        regExp: new RegExp('["\']?(' + key + ')["\']?', 'g'),
        value,
        isString,
      })
    }

    return result
  },
  async transform({ asset, config }) {
    if (asset.filePath.includes('node_modules')) {
      return [asset]
    }

    const code = await asset.getCode()

    let transformed = code
    for (const entry of config) {
      const { isString, value, regExp, name } = entry
      transformed = transformed.replace(regExp, match =>
        isString ? match.replace(name, value) : value
      )
    }

    asset.setCode(transformed)
    return [asset]
  },
})
