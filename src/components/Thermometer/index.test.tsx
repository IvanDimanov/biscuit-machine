import { render, screen } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import Thermometer from './index'


describe('components/Thermometer', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Thermometer />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Thermometer testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Thermometer`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Thermometer testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Thermometer`)).toHaveClass(className)
  })


  test('should show indicator when requested', () => {
    const testIdPrefix = 'test-id'
    render(<Thermometer testIdPrefix={testIdPrefix} shouldShowIndicator />)

    expect(screen.getByTestId(`${testIdPrefix}.Thermometer.Indicator`)).toBeInTheDocument()
  })


  test('should not show indicator when not requested', () => {
    const testIdPrefix = 'test-id'
    render(<Thermometer testIdPrefix={testIdPrefix} shouldShowIndicator={false} />)

    expect(() => {
      screen.getByTestId(`${testIdPrefix}.Thermometer.Indicator`)
    }).toThrow()
  })


  test('should show temperature', () => {
    const testIdPrefix = 'test-id'
    const temperature = 45.5
    render(<Thermometer testIdPrefix={testIdPrefix} temperature={temperature} />)

    expect(screen.getByTestId(`${testIdPrefix}.Thermometer.Indicator`)).toHaveTextContent(String(temperature))
  })


  test('should use label suffix when showing temperature', () => {
    const testIdPrefix = 'test-id'
    const temperature = 45.5
    const labelSuffix = 'Test suffix'
    render(<Thermometer testIdPrefix={testIdPrefix} temperature={temperature} labelSuffix={labelSuffix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Thermometer.Indicator`)).toHaveTextContent(`${temperature} ${labelSuffix}`)
  })


  test('should show pinned temperatures', () => {
    const testIdPrefix = 'test-id'
    const pinnedTemperatures = [21, 52]
    render(<Thermometer testIdPrefix={testIdPrefix} pinnedTemperatures={pinnedTemperatures} />)

    expect(
      screen.getByTestId(`${testIdPrefix}.Thermometer.PinnedTemperature.${pinnedTemperatures[0]}`),
    ).toHaveTextContent(String(pinnedTemperatures[0]))

    expect(
      screen.getByTestId(`${testIdPrefix}.Thermometer.PinnedTemperature.${pinnedTemperatures[1]}`),
    ).toHaveTextContent(String(pinnedTemperatures[1]))
  })


  test('should use label suffix when showing pinned temperatures', () => {
    const testIdPrefix = 'test-id'
    const pinnedTemperatures = [21, 52]
    const labelSuffix = 'Test suffix'
    render(<Thermometer testIdPrefix={testIdPrefix} pinnedTemperatures={pinnedTemperatures} labelSuffix={labelSuffix} />)

    expect(
      screen.getByTestId(`${testIdPrefix}.Thermometer.PinnedTemperature.${pinnedTemperatures[0]}`),
    ).toHaveTextContent(`${pinnedTemperatures[0]} ${labelSuffix}`)

    expect(
      screen.getByTestId(`${testIdPrefix}.Thermometer.PinnedTemperature.${pinnedTemperatures[1]}`),
    ).toHaveTextContent(`${pinnedTemperatures[1]} ${labelSuffix}`)
  })
})
