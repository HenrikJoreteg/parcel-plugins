const pkg = require('./package.json')

module.exports = {
  APP_VERSION: pkg.version,
  APP_NAME: pkg.name,
  API_URL: process.env.API_URL || 'https://dev.api.com',
  IS_DEV: process.env.NODE_ENV !== 'production',
  BUILD_TIME: Date.now(),
}
