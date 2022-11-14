/**
 * Regex validate function
 * @param {RegExp} regex - regex candidate
 * @returns {string|undefined} - Depending if the input param is truthy or not, the return value is undefined or error message (string)
 */
export const regex =
  (errorMsg: string = "Invalid format", regex: RegExp) =>
  (str: string) => {
    return str && !regex.test(String(str).toLowerCase()) ? errorMsg : undefined;
  };

export default regex;
