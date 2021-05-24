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


describe('Game Lose', () => {
  it('should print final game result when game is lost', async () => {
    await page.click('[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.On"]')

    /* Wait until the heating element explode */
    await delay(75_000)

    await expect(page).toEqualText(
      '[data-testid="Test.ModalLost.Header"]',
      'Game Over')

    await expect(page).toEqualText(
      '[data-testid="Test.ModalLost.Scoreboard.TotalScoreValue"]',
      '14.30')

    await expect(page).toEqualText(
      '[data-testid="Test.ModalLost.Scoreboard.totalCollectedBiscuitsValue"]',
      '11')

    await expect(page).toEqualText(
      '[data-testid="Test.ModalLost.PlayAgainButton.Button"]',
      'Play again')
  })
})

export {}
