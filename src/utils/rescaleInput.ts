/**
 * This function takes a number from a input range and
 * returns it`s corresponding value of an output range.
 *
 * @example:
 *   If we have the value 5 in scale [0, 10] (both included)
 *   and we want to know it`s corresponding value in scale [0, 100] (both included)
 *   then we can make a call like:
 *     rescaleInput(5, [0, 10], [0, 100])  =>  50
 *
 *   Following the same logic:
 *     rescaleInput( 9, [0,  10], [0, 100])  =>  90
 *     rescaleInput(31, [0, 100], [0,  10])  =>   3.1
 *
 * @param {number} input Input number
 * @param {number} inputScaleMin Minimum value of the input number
 * @param {number} inputScaleMax Maximum value of the input number
 * @param {number} outputScaleMin Minimum value of the output number
 * @param {number} outputScaleMax Maximum value of the output number
 *
 * @return {number} Scaled output number
 */
const rescaleInput = (
  input: number,
  [inputScaleMin, inputScaleMax]: [number, number],
  [outputScaleMin, outputScaleMax]: [number, number],
): number => (Math.max(0, input) - inputScaleMin) *
  (outputScaleMax - outputScaleMin) /
  (inputScaleMax - inputScaleMin) +
  outputScaleMin


export default rescaleInput
