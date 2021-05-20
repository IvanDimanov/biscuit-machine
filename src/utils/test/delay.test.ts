import delay from '../delay'


describe('utils/delay()', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })


  describe('success calls', () => {
    test('should return "undefined" by default', (done) => {
      delay(1000)
        .then((result) => {
          expect(result).toBe(undefined)
          done()
        })

      jest.advanceTimersByTime(2000)
    })

    test('should return predefined success result', (done) => {
      const successResult = 'test-success-result'
      delay(1000, successResult)
        .then((result) => {
          expect(result).toBe(successResult)
          done()
        })

      jest.advanceTimersByTime(2000)
    })
  })


  describe('error calls', () => {
    test('should throw predefined error result', (done) => {
      const errorResult = 'test-error-result'
      delay(1000, errorResult, false)
        .catch((result) => {
          expect(result).toBe(errorResult)
          done()
        })

      jest.advanceTimersByTime(2000)
    })
  })
})
