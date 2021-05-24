// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
  browsers: ['firefox'],
  serverOptions: {
    command: 'npm start',
    port: 3000,
    launchTimeout: 10000,
    debug: true,
    options: {
      env: {
        BROWSER: 'none',
        USE_BABEL_PLUGIN_ISTANBUL: 'TRUE',
      },
    },
  },
  launchOptions: {
    headless: true,
  },
}
