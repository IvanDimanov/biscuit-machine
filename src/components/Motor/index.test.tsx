import { render, screen } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import Motor from './index'


describe('components/Motor', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Motor />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Motor testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Motor`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Motor testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Motor`)).toHaveClass(className)
  })
})
