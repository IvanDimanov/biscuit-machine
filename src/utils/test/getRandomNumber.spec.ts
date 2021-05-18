import getRandomNumber from '../getRandomNumber'


describe('/utils/getRandomNumber()', () => {
  it('Should return a random number between 10 and 15', () => {
    const lowerLimit = 10
    const upperLimit = 15
    const length = 100
    const results = Array.from({ length }).map(() => getRandomNumber(lowerLimit, upperLimit)).sort()

    expect(results.shift()).toBeGreaterThanOrEqual(lowerLimit)
    expect(results.pop()).toBeGreaterThanOrEqual(upperLimit)
  })
})
