import { render, screen } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import Oven from './index'


describe('components/Oven', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Oven />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Oven testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Oven`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Oven testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Oven`)).toHaveClass(className)
  })
})
