/**
 *
 * @param {string} str - String candidate
 * @param {number} len - Minimum length of the string
 * @param {string} errorMsg - Error Message
 * @returns {string|undefined} - Depending if the input param is truthy or not, the return value is undefined or error message (string)
 */
export const maxNum =
  (len: number) =>
  (errorMsg: string = "Invalid length") =>
  (value: number) =>
    value && value > len ? errorMsg : undefined;

export default maxNum;
