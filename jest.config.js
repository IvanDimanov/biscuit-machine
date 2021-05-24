module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    'transform': {
      '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    },
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}
