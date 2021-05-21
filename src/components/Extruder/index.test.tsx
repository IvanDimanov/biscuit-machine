import { render, screen, waitFor } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import Extruder, { EXTRUDER_ANIMATION_TIME_IN_SECONDS } from './index'

/* How much time it`ll take to make sure the extrusion is over */
const EXTRUDER_ANIMATION_TIME = (EXTRUDER_ANIMATION_TIME_IN_SECONDS + 0.5 * EXTRUDER_ANIMATION_TIME_IN_SECONDS) * 1000


describe('components/Extruder', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Extruder />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Extruder testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Extruder`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Extruder testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Extruder`)).toHaveClass(className)
  })


  test('should trigger onExtrudeEnd', async () => {
    const testIdPrefix = 'test-id'
    const onExtrudeEnd = jest.fn()
    render(<Extruder testIdPrefix={testIdPrefix} shouldExtrude onExtrudeEnd={onExtrudeEnd} />)

    await waitFor(() => {
      expect(onExtrudeEnd).toHaveBeenCalledTimes(1)
    }, { timeout: EXTRUDER_ANIMATION_TIME })
  })
})
