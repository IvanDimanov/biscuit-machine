import { render, screen } from '@src/test/utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import Switch from './index'


describe('components/Switch', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Switch />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Switch testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Switch`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Switch testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Switch`)).toHaveClass(className)
  })


  test('should trigger onChange', () => {
    const testIdPrefix = 'test-id'
    const onChange = jest.fn()
    render(<Switch testIdPrefix={testIdPrefix} onChange={onChange} />)

    userEvent.click(screen.getByTestId(`${testIdPrefix}.Switch.Check.On`))

    expect(onChange).toHaveBeenCalledTimes(1)
  })


  test('should have a "disabled" state', () => {
    const testIdPrefix = 'test-id'
    render(<Switch testIdPrefix={testIdPrefix} disabled />)

    expect(screen.getByTestId(`${testIdPrefix}.Switch.Check.On`)).toBeDisabled()
    expect(screen.getByTestId(`${testIdPrefix}.Switch.Check.Pause`)).toBeDisabled()
    expect(screen.getByTestId(`${testIdPrefix}.Switch.Check.Off`)).toBeDisabled()
  })


  test('should not trigger onChange when in "disabled" state', () => {
    const testIdPrefix = 'test-id'
    const onChange = jest.fn()
    render(<Switch testIdPrefix={testIdPrefix} onChange={onChange} disabled />)

    userEvent.click(screen.getByTestId(`${testIdPrefix}.Switch.Check.On`))

    expect(onChange).toHaveBeenCalledTimes(0)
  })


  test('should use predefined value', () => {
    const testIdPrefix = 'test-id'
    render(<Switch testIdPrefix={testIdPrefix} value="on" />)

    expect(screen.getByTestId(`${testIdPrefix}.Switch.Check.On`)).toBeChecked()
  })
})
