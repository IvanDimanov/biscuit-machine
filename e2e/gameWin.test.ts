import { toMatchImageSnapshot } from 'jest-image-snapshot'

import delay from '../src/utils/delay'

expect.extend({ toMatchImageSnapshot })

// Needs to be higher than the default Playwright timeout
jest.setTimeout(90_000)


beforeAll(async () => {
  await page.goto('http://localhost:3000')
  await page.setViewportSize({ width: 1600, height: 900 })
})


beforeEach(async () => {
  await page.click('[data-testid="Test.LanguageControls.English"]')
})


describe('Game Win', () => {
  it('should print final game result when game is won', async () => {
    await page.click('[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.On"]')

    /* Wait until the game accumulate some points */
    await delay(38_000)

    /* Cache in the current result */
    await page.click('[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.Off"]')

    /* Wait until score animation is over */
    await delay(10_000)

    await expect(page).toEqualText(
      '[data-testid="Test.ModalWon.Header"]',
      'You Won')

    await expect(page).toEqualText(
      '[data-testid="Test.ModalWon.Scoreboard.TotalScoreValue"]',
      '2.60')

    await expect(page).toEqualText(
      '[data-testid="Test.ModalWon.Scoreboard.totalCollectedBiscuitsValue"]',
      '2')

    await expect(page).toEqualText(
      '[data-testid="Test.ModalWon.PlayAgainButton.Button"]',
      'Play again')
  })
})

export {}
