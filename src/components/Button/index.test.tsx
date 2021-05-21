import { render, screen } from '@src/test/utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import Button from './index'


describe('components/Button', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Button />,
    )).not.toThrow()
  })


  test('should have the role of "button"', () => {
    render(<Button />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })


  test('should render children', () => {
    const buttonLabel = 'Test button'
    render(<Button>{buttonLabel}</Button>)

    expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Button testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Button`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const className = 'test-css-class'
    render(<Button className={className} />)

    expect(screen.getByRole('button')).toHaveClass(className)
  })


  test('should trigger onClick', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick} />)

    userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })


  test('should have a "disabled" state', () => {
    render(<Button disabled />)

    expect(screen.getByRole('button')).toBeDisabled()
  })


  test('should not trigger onClick when in "disabled" state', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick} disabled />)

    userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(0)
  })
})
