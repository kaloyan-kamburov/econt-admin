/**
 *
 * @param {any} value
 * @param {string} errorMsg - Error Message
 * @returns {string|undefined} - Depending if the input param is truthy or not, the return value is undefined or error message (string)
 */
const required: any =
  (errorMsg: string = "Required") =>
  (value: string | number) => {
    const currValue = `${value}`;
    if (typeof value === "number") {
      return !!currValue ? undefined : errorMsg;
    }
    return !!value ? undefined : errorMsg;
  };

export default required;
