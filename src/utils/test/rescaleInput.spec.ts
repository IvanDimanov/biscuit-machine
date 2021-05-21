import rescaleInput from '../rescaleInput'


describe('/utils/rescaleInput()', () => {
  describe('Validate range extremes', () => {
    it('Should return the lowest range value', () => {
      const inputScaleMin = 0
      const inputScaleMax = 10
      const outputScaleMin = 0
      const outputScaleMax = 100

      expect(
        rescaleInput(
          inputScaleMin,
          [inputScaleMin, inputScaleMax],
          [outputScaleMin, outputScaleMax],
        ),
      ).toEqual(outputScaleMin)
    })


    it('Should return the highest range value', () => {
      const inputScaleMin = 0
      const inputScaleMax = 10
      const outputScaleMin = 0
      const outputScaleMax = 100

      expect(
        rescaleInput(
          inputScaleMax,
          [inputScaleMin, inputScaleMax],
          [outputScaleMin, outputScaleMax],
        ),
      ).toEqual(outputScaleMax)
    })
  })


  describe('Validate range midpoints', () => {
    it('Should return the 1/3 of the range value', () => {
      const inputScaleMin = 0
      const inputScaleMax = 10
      const outputScaleMin = 0
      const outputScaleMax = 100

      expect(
        rescaleInput(
          inputScaleMax * 1/3,
          [inputScaleMin, inputScaleMax],
          [outputScaleMin, outputScaleMax],
        ),
      ).toEqual(outputScaleMax * 1/3)
    })


    it('Should return the 1/2 of the range value', () => {
      const inputScaleMin = 0
      const inputScaleMax = 10
      const outputScaleMin = 0
      const outputScaleMax = 100

      expect(
        rescaleInput(
          inputScaleMax * 1/2,
          [inputScaleMin, inputScaleMax],
          [outputScaleMin, outputScaleMax],
        ),
      ).toEqual(outputScaleMax * 1/2)
    })


    it('Should return the 3/5 of the range value', () => {
      const inputScaleMin = 0
      const inputScaleMax = 10
      const outputScaleMin = 0
      const outputScaleMax = 100

      expect(
        rescaleInput(
          inputScaleMax * 3/5,
          [inputScaleMin, inputScaleMax],
          [outputScaleMin, outputScaleMax],
        ),
      ).toEqual(outputScaleMax * 3/5)
    })
  })
})
