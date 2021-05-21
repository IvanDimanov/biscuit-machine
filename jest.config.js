module.exports = {
  moduleNameMapper: {
    'transform': {
      '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    },
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
}
