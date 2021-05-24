import { toMatchImageSnapshot } from 'jest-image-snapshot'

import delay from '../src/utils/delay'

expect.extend({ toMatchImageSnapshot })

// Needs to be higher than the default Playwright timeout
jest.setTimeout(40_000)


beforeAll(async () => {
  await page.goto('http://localhost:3000')
  await page.setViewportSize({ width: 1600, height: 900 })
})


beforeEach(async () => {
  await page.click('[data-testid="Test.LanguageControls.English"]')
})


describe('Game Start', () => {
  it('should look as expected when player start the game', async () => {
    await page.click('[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.On"]')

    await delay(5_000)

    const snapshot = await page.screenshot()
    expect(snapshot).toMatchImageSnapshot({
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    })
  })
})

export {}
