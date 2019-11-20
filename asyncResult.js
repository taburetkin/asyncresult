
/**
 * @param {*} err - error to set.
 * @param {*} val - value to set.
 * @class AsyncResult
 */
const AsyncResult = function(err, val) {
  this.set(err, val);
};

AsyncResult.prototype = {
  /**
   * Indicates if there is an error.
   * @returns {boolean} - True if there is an error or rejected promise, otherwise false
   */
  isError() {
    return this.err() != null;
  },
  /**
   * Indicates if there is no error.
   * @returns {boolean} - True if there is no error, otherwise false
   */
  isOk() {
    return this.err() == null;
  },

  /**
   * Indicates if there is no error and value is significant.
   * Empty string treated as significant while `undefined` and `null` are not.
   * @returns {boolen} - True if there is no error and value is not empty
   */
  isEmpty() {
    return this.isOk() && !this.hasValue();
  },

  /**
   * Indicates if a value is significant.
   * Empty string treated as significant while `undefined` and `null` are not.
   * @returns {boolen} - True if value is not empty
   */
  hasValue() {
    return this.val() != null;
  },

  //#region extracting values

  /**
   * returns error
   * @returns {*} - error
   */
  err() {
    return this.error;
  },
  /**
   * returns value
   * @returns {*} - value
   */
  val() {
    return this.value;
  },
  /**
   * returns error if any or value
   * @returns {*} - error or value in such order.
   */
  errOrVal() {
    return this.isError() ? this.err() : this.val();
  },

  //#endregion

  //#region setting values

  /**
   * Sets the value.
   * @param {*} value - value to set
   * @return {void}
   */
  setValue(value) {
    this.value = value;
  },
  /**
   * Sets the error.
   * @param {*} err - error to set
   * @return {void}
   */
  setError(err) {
    this.error = err;
  },
  /**
   * Sets both, error and value
   * @param {*} err - error to set
   * @param {*} value - value to set
   * @return {void}
   */
  set(err, value) {
    this.setError(err);
    this.setValue(value);
  }

  //#endregion
};

/**
 * Creates success AsyncResult instance with given value
 * @param {*} value - value to set.
 * @returns {AsyncResult} success AsyncResult instance
 */
function success(value) {
  return new this(null, value);
}

/**
 * Creates failed AsyncResult instance with given error.
 * @param {*} err - error to set
 * @returns {AsyncResult} failed AsyncResult instance
 */
function error(err) {
  return new this(err);
}

AsyncResult.success = success;
AsyncResult.fail = error;

export default AsyncResult;
