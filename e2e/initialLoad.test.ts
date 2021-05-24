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


describe('Initial load', () => {
  it('should look as expected', async () => {
    const snapshot = await page.screenshot()
    expect(snapshot).toMatchImageSnapshot({
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    })
  })


  it('should be able to change language to English', async () => {
    await page.click('[data-testid="Test.LanguageControls.English"]')
    /* Changing a language takes some time to reload the DOM */
    await delay(1000)

    await expect(page).toEqualText('[data-testid="Title"]', 'The Biscuit Machine')

    await expect(page).toEqualText(
      '[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.On.Label"]',
      'On')
    await expect(page).toEqualText(
      '[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.Off.Label"]',
      'Off')
    await expect(page).toEqualText(
      '[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.Pause.Label"]',
      'Pause')

    await expect(page).toEqualText('[data-testid="Footer.Text"]', 'Made with 🧡 by Ivan')
  })


  it('should be able to change language to Bulgarian', async () => {
    await page.click('[data-testid="Test.LanguageControls.Bulgarian"]')
    /* Changing a language takes some time to reload the DOM */
    await delay(1000)

    await expect(page).toEqualText('[data-testid="Title"]', 'Машината за бисквитки')

    await expect(page).toEqualText(
      '[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.On.Label"]',
      'Вкл.')
    await expect(page).toEqualText(
      '[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.Off.Label"]',
      'Изк.')
    await expect(page).toEqualText(
      '[data-testid="BiscuitMachine.Machine.SwitchPart.Switch.Check.Pause.Label"]',
      'Пауза')

    await expect(page).toEqualText('[data-testid="Footer.Text"]', 'Направено с 🧡 от Иван')
  })


  describe('all parts should be initially set to "Off"', () => {
    it('should show Motor with status of "Off"', async () => {
      await expect(page).toHaveSelector(
        '[data-testid="BiscuitMachine.Machine.MotorPart.Status.Off"]',
        { state: 'attached' })
    })

    it('should show Extruder with status of "Off"', async () => {
      await expect(page).toHaveSelector(
        '[data-testid="BiscuitMachine.Machine.ConveyorBeltPart.ExtruderPart.Status.Off"]',
        { state: 'attached' })
    })

    it('should show Stamper with status of "Off"', async () => {
      await expect(page).toHaveSelector(
        '[data-testid="BiscuitMachine.Machine.ConveyorBeltPart.StamperPart.Status.Off"]',
        { state: 'attached' })
    })

    it('should show Stamper with status of "Off"', async () => {
      await expect(page).toHaveSelector(
        '[data-testid="BiscuitMachine.Machine.ConveyorBeltPart.OvenPart.Status.Off"]',
        { state: 'attached' })
    })
  })
})

export {}
