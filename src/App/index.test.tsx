import { Suspense } from 'react'
import { render } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import App from './index'


describe('App', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Suspense fallback="Loading ...">
        <App />
      </Suspense>,
    )).not.toThrow()
  })
})
