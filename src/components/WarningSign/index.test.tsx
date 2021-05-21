import { render, screen } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import WarningSign from './index'


describe('components/WarningSign', () => {
  test('should render successfully', () => {
    expect(() => render(
      <WarningSign />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<WarningSign testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.WarningSign`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<WarningSign testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.WarningSign`)).toHaveClass(className)
  })
})
