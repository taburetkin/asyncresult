const AsyncResult = function(err, val) {
	this.set(err, val);
}

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
	set() {
		let arr = [];
		if (arguments.length == 2) {
			arr = arguments;
		} else if (arguments.length == 1 && Array.isArray(arguments[0])) {
			arr = arguments[0];
		}
		this.setError(arr[0]);
		this.setValue(arr[1]);
	}

	//#endregion

};

AsyncResult.success = function(data) {
	return new AsyncResult(null, data);
}

AsyncResult.fail = function(err) {
	return new AsyncResult(err);
}

export default AsyncResult;
