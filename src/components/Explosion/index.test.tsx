import { render, screen, waitFor } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import Explosion, { EXPLOSION_ANIMATION_TIME_IN_SECONDS } from './index'

/* How much time it`ll take to make sure the explosion is over */
const EXPLOSION_ANIMATION_TIME = (EXPLOSION_ANIMATION_TIME_IN_SECONDS + 0.5 * EXPLOSION_ANIMATION_TIME_IN_SECONDS) * 1000


describe('components/Explosion', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Explosion />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Explosion testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Explosion`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Explosion testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Explosion`)).toHaveClass(className)
  })


  test('should trigger onExplosionEnd', async () => {
    const testIdPrefix = 'test-id'
    const onExplosionEnd = jest.fn()
    render(<Explosion testIdPrefix={testIdPrefix} shouldExplode onExplosionEnd={onExplosionEnd} />)

    await waitFor(() => {
      expect(onExplosionEnd).toHaveBeenCalledTimes(1)
    }, { timeout: EXPLOSION_ANIMATION_TIME })
  })
})
