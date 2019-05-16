import { AsyncResult } from '../..';

describe('# AsyncResult', function() {

	describe('when created with value and without error', function() {
		let instance;
		const value = { foo: 'bar' };

		beforeEach(function() {
			instance = new AsyncResult(null, value);
		});

		it('should return value when called val()', function() {
			expect(instance.val()).to.be.equal(value);
		});

		it('should return null when called err()', function() {
			expect(instance.err()).to.be.null;
		});

		it('should return value when called errOrVal()', function() {
			expect(instance.errOrVal()).to.be.equal(value);
		});

		it('should return true when called isOk()', function() {
			expect(instance.isOk()).to.be.true;
		});

		it('should return false when called isError()', function() {
			expect(instance.isError()).to.be.false;
		});

		it('should return false when called isEmpty()', function() {
			expect(instance.isEmpty()).to.be.false;
		});

		it('should return true when called hasValue()', function() {
			expect(instance.hasValue()).to.be.true;
		});

	});

	describe('when created without arguments and seted value after', function() {
		let instance;
		const value = { foo: 'bar' };
		beforeEach(function() {
			instance = new AsyncResult();
			instance.setValue(value);
		});

		it('should return value when called val()', function() {
			expect(instance.val()).to.be.equal(value);
		});

		it('should return undefined when called err()', function() {
			expect(instance.err()).to.be.undefined;
		});

		it('should return value when called errOrVal()', function() {
			expect(instance.errOrVal()).to.be.equal(value);
		});

		it('should return true when called isOk()', function() {
			expect(instance.isOk()).to.be.true;
		});

		it('should return false when called isError()', function() {
			expect(instance.isError()).to.be.false;
		});

		it('should return false when called isEmpty()', function() {
			expect(instance.isEmpty()).to.be.false;
		});

		it('should return true when called hasValue()', function() {
			expect(instance.hasValue()).to.be.true;
		});

	});

	describe('when created with error and without value', function() {
		let instance;
		const value = { foo: 'bar' };

		beforeEach(function() {
			instance = new AsyncResult(value);
		});

		it('should return undefined when called val()', function() {
			expect(instance.val()).to.be.undefined;
		});

		it('should return error value when called err()', function() {
			expect(instance.err()).to.be.equal(value);
		});

		it('should return error value when called errOrVal()', function() {
			expect(instance.errOrVal()).to.be.equal(value);
		});

		it('should return false when called isOk()', function() {
			expect(instance.isOk()).to.be.false;
		});

		it('should return true when called isError()', function() {
			expect(instance.isError()).to.be.true;
		});

		it('should return false when called isEmpty()', function() {
			expect(instance.isEmpty()).to.be.false;
		});

		it('should return false when called hasValue()', function() {
			expect(instance.hasValue()).to.be.false;
		});

	});

	describe('when created without arguments and seted error after', function() {
		let instance;
		const value = { foo: 'bar' };

		beforeEach(function() {
			instance = new AsyncResult();
			instance.setError(value);
		});

		it('should return undefined when called val()', function() {
			expect(instance.val()).to.be.undefined;
		});

		it('should return error value when called err()', function() {
			expect(instance.err()).to.be.equal(value);
		});

		it('should return error value when called errOrVal()', function() {
			expect(instance.errOrVal()).to.be.equal(value);
		});

		it('should return false when called isOk()', function() {
			expect(instance.isOk()).to.be.false;
		});

		it('should return true when called isError()', function() {
			expect(instance.isError()).to.be.true;
		});

		it('should return false when called isEmpty()', function() {
			expect(instance.isEmpty()).to.be.false;
		});

		it('should return false when called hasValue()', function() {
			expect(instance.hasValue()).to.be.false;
		});

	});

	describe('when created with value and error', function() {
		let instance;
		const value = { foo: 'bar' };
		const error = 'some error';
		beforeEach(function() {
			instance = new AsyncResult(error, value);
		});

		it('should return value when called val()', function() {
			expect(instance.val()).to.be.equal(value);
		});

		it('should return error when called err()', function() {
			expect(instance.err()).to.be.equal(error);
		});

		it('should return error value when called errOrVal()', function() {
			expect(instance.errOrVal()).to.be.equal(error);
		});

		it('should return false when called isOk()', function() {
			expect(instance.isOk()).to.be.false;
		});

		it('should return true when called isError()', function() {
			expect(instance.isError()).to.be.true;
		});

		it('should return false when called isEmpty()', function() {
			expect(instance.isEmpty()).to.be.false;
		});

		it('should return true when called hasValue()', function() {
			expect(instance.hasValue()).to.be.true;
		});

	});

	describe('when created without arguments and seted value and error after', function() {
		let instance;
		const value = { foo: 'bar' };
		const error = 'some error';
		beforeEach(function() {
			instance = new AsyncResult();
			instance.set(error, value);
		});

		it('should return value when called val()', function() {
			expect(instance.val()).to.be.equal(value);
		});

		it('should return error when called err()', function() {
			expect(instance.err()).to.be.equal(error);
		});

		it('should return error value when called errOrVal()', function() {
			expect(instance.errOrVal()).to.be.equal(error);
		});

		it('should return false when called isOk()', function() {
			expect(instance.isOk()).to.be.false;
		});

		it('should return true when called isError()', function() {
			expect(instance.isError()).to.be.true;
		});

		it('should return false when called isEmpty()', function() {
			expect(instance.isEmpty()).to.be.false;
		});

		it('should return true when called hasValue()', function() {
			expect(instance.hasValue()).to.be.true;
		});

	});

	describe('when created with empty string as error and some value', function() {
		let instance;
		const value = { foo: 'bar' };
		const error = '';
		beforeEach(function() {
			instance = new AsyncResult();
			instance.set(error, value);
		});

		it('should return value when called val()', function() {
			expect(instance.val()).to.be.equal(value);
		});

		it('should return error when called err()', function() {
			expect(instance.err()).to.be.equal(error);
		});

		it('should return error value when called errOrVal()', function() {
			expect(instance.errOrVal()).to.be.equal(error);
		});

		it('should return false when called isOk()', function() {
			expect(instance.isOk()).to.be.false;
		});

		it('should return true when called isError()', function() {
			expect(instance.isError()).to.be.true;
		});

		it('should return false when called isEmpty()', function() {
			expect(instance.isEmpty()).to.be.false;
		});

		it('should return true when called hasValue()', function() {
			expect(instance.hasValue()).to.be.true;
		});

	});

	describe('when created with static factory methods', function() {
		it('should create AsyncResult with value `foo` when creating with `success', function() {
			let res = AsyncResult.success('foo');
			expect(res).to.be.instanceof(AsyncResult);
			expect(res.val()).to.be.equal('foo');
		});
		it('should create AsyncResult with error `foo` when creating with `fail', function() {
			let res = AsyncResult.fail('foo');
			expect(res).to.be.instanceof(AsyncResult);
			expect(res.err()).to.be.equal('foo');
		});
	});
});
