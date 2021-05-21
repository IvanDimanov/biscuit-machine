import { render, screen } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import Biscuit from './index'


describe('components/Biscuit', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Biscuit />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Biscuit testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Biscuit`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Biscuit testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Biscuit`)).toHaveClass(className)
  })


  test('should have a predefined form of "Blob"', () => {
    const testIdPrefix = 'test-id'
    render(<Biscuit testIdPrefix={testIdPrefix} form="blob" />)

    expect(screen.getByTestId(`${testIdPrefix}.Biscuit.Blob`)).toBeInTheDocument()
  })


  test('should show vapor animation when requested', () => {
    const testIdPrefix = 'test-id'
    render(<Biscuit testIdPrefix={testIdPrefix} isBacking />)

    expect(screen.getByTestId(`${testIdPrefix}.Biscuit.Vapor`)).toBeInTheDocument()
  })


  test('should not show vapor animation when not requested', () => {
    const testIdPrefix = 'test-id'
    render(<Biscuit testIdPrefix={testIdPrefix} isBacking={false} />)

    expect(() => screen.getByTestId(`${testIdPrefix}.Biscuit.Vapor`)).toThrow()
  })
})
