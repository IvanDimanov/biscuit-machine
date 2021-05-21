import { render, screen, waitFor } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import Scoreboard, { COUNT_UP_DURATION_IN_SECONDS } from './Scoreboard'

/**
 * The count up component will complete it`s animation
 * when this time is over
 */
const COUNT_UP_DURATION = (COUNT_UP_DURATION_IN_SECONDS + 0.1 * COUNT_UP_DURATION_IN_SECONDS) * 1000


describe('App/modals/Scoreboard', () => {
  test('should render successfully', () => {
    expect(() => render(
      <Scoreboard />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<Scoreboard testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.Scoreboard`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<Scoreboard testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.Scoreboard`)).toHaveClass(className)
  })


  test('should show correct `totalScore`', async () => {
    const testIdPrefix = 'test-id'
    const totalScore = 21.17
    render(<Scoreboard testIdPrefix={testIdPrefix} totalScore={totalScore} />)

    await waitFor(() => {
      expect(
        screen.getByTestId(`${testIdPrefix}.Scoreboard.TotalScoreValue`),
      ).toHaveTextContent(String(totalScore))
    }, { timeout: COUNT_UP_DURATION })
  })


  test('should show correct `totalCollectedBiscuits`', async () => {
    const testIdPrefix = 'test-id'
    const totalCollectedBiscuits = 21
    render(<Scoreboard testIdPrefix={testIdPrefix} totalCollectedBiscuits={totalCollectedBiscuits} />)

    await waitFor(() => {
      expect(
        screen.getByTestId(`${testIdPrefix}.Scoreboard.totalCollectedBiscuitsValue`),
      ).toHaveTextContent(String(totalCollectedBiscuits))
    }, { timeout: COUNT_UP_DURATION })
  })
})
