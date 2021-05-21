import { render, screen } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import ConveyorBelt from './index'


describe('components/ConveyorBelt', () => {
  test('should render successfully', () => {
    expect(() => render(
      <ConveyorBelt />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<ConveyorBelt testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.ConveyorBelt`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<ConveyorBelt testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.ConveyorBelt`)).toHaveClass(className)
  })


  test('should extend with expected number of `totalCenterUnits`', () => {
    const testIdPrefix = 'test-id'
    const totalCenterUnits = 4
    render(<ConveyorBelt testIdPrefix={testIdPrefix} totalCenterUnits={totalCenterUnits} />)

    expect(screen.getByTestId(`${testIdPrefix}.ConveyorBelt.Center[${totalCenterUnits - 1}]`)).toBeInTheDocument()
  })
})
