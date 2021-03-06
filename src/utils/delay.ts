/**
 * Will return a Promise that will be resolved or rejected after specific time.
 *
 * @category utils
 *
 * @param {number} [timeout=100] - After how many milliseconds the Promise will be resolved
 * @param {any} [response=undefined] - What will be returned as a result in the Promise resolution
 * @param {boolean} [isSuccess=true] - Will the Promise be resolved or rejected
 *
 * @return {object} Promise that will be resolved or rejected after specific time.
 */
function delay(timeout: number = 100, response: any = undefined, isSuccess: boolean = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        return resolve(response)
      }
      return reject(response)
    }, timeout)
  })
}

export default delay
