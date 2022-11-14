/**
 *
 * @param {string} str - Email
 * @param {string} errorMsg - Error Message
 * @returns {string|undefined} - Depending if the input param is truthy or not, the return value is undefined or error message (string)
 */
export const isEmail =
  (errorMsg: string = "Invalid email format") =>
  (str: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

    return str && !emailRegex.test(String(str).toLowerCase())
      ? errorMsg
      : undefined;
  };

export default isEmail;
