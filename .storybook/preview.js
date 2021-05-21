const React = require('react')
require('!style-loader!css-loader!./index.css')

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <React.Suspense fallback="Loading ...">
      <Story />
    </React.Suspense>
  ),
]
