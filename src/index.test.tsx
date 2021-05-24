import { render } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'


describe('Main', () => {
  test('should render successfully', () => {
    expect(() => {
      render(<div id="root" />)
      require('./index')
    }).not.toThrow()
  })
})
