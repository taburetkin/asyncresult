const AsyncResult = function(err, val) {
  this.set(err, val);
};

AsyncResult.prototype = {
  isError() {
    return this.err() != null;
  },
  isOk() {
    return this.err() == null;
  },
  isEmpty() {
    return this.isOk() && !this.hasValue();
  },
  hasValue() {
    return this.val() != null;
  },

  //#region extracting values

  err() {
    return this.error;
  },
  val() {
    return this.value;
  },
  errOrVal() {
    return this.isError() ? this.err() : this.val();
  },

  //#endregion

  //#region setting values

  setValue(value) {
    this.value = value;
  },
  setError(err) {
    this.error = err;
  },
  set(err, value) {
    this.setError(err);
    this.setValue(value);
  }

  //#endregion
};

AsyncResult.success = function(data) {
  return new AsyncResult(null, data);
};

AsyncResult.fail = function(err) {
  return new AsyncResult(err);
};

export default AsyncResult;
