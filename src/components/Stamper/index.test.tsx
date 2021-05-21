import { render, screen, waitFor } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import Stamper, { STAMP_DOWN_ANIMATION_TIME_IN_SECONDS, STAMP_ANIMATION_TIME_IN_SECONDS } from './index'

/* How much time it`ll take to make sure the stamp is on it`s lowest point */
const STAMP_DOWN_ANIMATION_TIME = (STAMP_DOWN_ANIMATION_TIME_IN_SECONDS + 0.5 * STAMP_DOWN_ANIMATION_TIME_IN_SECONDS) * 1000

/* How much time it`ll take to make sure the stamp is over */
const STAMP_ANIMATION_TIME_IN = (STAMP_ANIMATION_TIME_IN_SECONDS + 0.5 * STAMP_ANIMATION_TIME_IN_SECONDS) * 1000


describe('components/Stamper', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Stamper />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Stamper testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Stamper`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Stamper testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Stamper`)).toHaveClass(className)
  })


  test('should trigger onStamp', async () => {
    const testIdPrefix = 'test-id'
    const onStamp = jest.fn()
    render(<Stamper testIdPrefix={testIdPrefix} shouldStamp onStamp={onStamp} />)

    await waitFor(() => {
      expect(onStamp).toHaveBeenCalledTimes(1)
    }, { timeout: STAMP_DOWN_ANIMATION_TIME })
  })


  test('should trigger onStampEnd', async () => {
    const testIdPrefix = 'test-id'
    const onStampEnd = jest.fn()
    render(<Stamper testIdPrefix={testIdPrefix} shouldStamp onStampEnd={onStampEnd} />)

    await waitFor(() => {
      expect(onStampEnd).toHaveBeenCalledTimes(1)
    }, { timeout: STAMP_ANIMATION_TIME_IN })
  })
})
