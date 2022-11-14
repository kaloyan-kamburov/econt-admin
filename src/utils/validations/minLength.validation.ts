/**
 *
 * @param {string} str - String candidate
 * @param {number} len - Minimum length of the string
 * @param {string} errorMsg - Error Message
 * @returns {string|undefined} - Depending if the input param is truthy or not, the return value is undefined or error message (string)
 */
const minLength =
  (len: number) =>
  (errorMsg = "Invalid length") =>
  (value: string | number) =>
    value && value.toString().length < len ? errorMsg : undefined;

export default minLength;
