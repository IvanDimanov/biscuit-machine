import { render, screen } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import Status from './index'


describe('components/Status', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Status />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Status testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Status`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Status testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Status`)).toHaveClass(className)
  })


  test('should use correct status value', () => {
    const testIdPrefix = 'test-id'
    render(<Status testIdPrefix={testIdPrefix} value="on" />)

    expect(screen.getByTestId(`${testIdPrefix}.Status.On`)).toBeInTheDocument()
  })


  test('should show bar indicator on the bottom left side', () => {
    const testIdPrefix = 'test-id'
    render(<Status testIdPrefix={testIdPrefix} bar="bottomLeft" />)

    expect(screen.getByTestId(`${testIdPrefix}.Status.Bar.BottomLeft`)).toBeInTheDocument()
  })


  test('should show bar indicator on the bottom right side', () => {
    const testIdPrefix = 'test-id'
    render(<Status testIdPrefix={testIdPrefix} bar="bottomRight" />)

    expect(screen.getByTestId(`${testIdPrefix}.Status.Bar.BottomRight`)).toBeInTheDocument()
  })
})
