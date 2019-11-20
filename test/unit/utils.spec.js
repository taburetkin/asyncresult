import { toAsyncResult, wrapMethod, AsyncResult, addAsync } from '../../';
import { OwnAsyncResult } from '../test-helpres';
import { config } from '../..';

describe('# utils:', function() {
  describe('## toAsyncResult:', function() {
    describe('when wrapped an empty value', function() {
      let wrapped;
      beforeEach(function() {
        wrapped = toAsyncResult();
      });

      it('should return promise', function() {
        expect(wrapped).to.be.instanceOf(Promise);
      });

      it('should resolve with AsyncResult instance', async function() {
        expect(await wrapped).to.be.instanceOf(AsyncResult);
      });

      it('should be empty', async function() {
        let result = await wrapped;
        expect(result.isEmpty()).to.be.true;
      });

      it('isError should return false', async function() {
        let result = await wrapped;
        expect(result.isError()).to.be.false;
      });

      it('isOk should return true', async function() {
        let result = await wrapped;
        expect(result.isOk()).to.be.true;
      });
    });

    describe('when wrapped not empty value', function() {
      let wrapped;
      let value = { foo: 'bar' };
      beforeEach(function() {
        wrapped = toAsyncResult(value);
      });

      it('should return promise', function() {
        expect(wrapped).to.be.instanceOf(Promise);
      });

      it('should resolve with AsyncResult instance', async function() {
        expect(await wrapped).to.be.instanceOf(AsyncResult);
      });

      it('should be not empty', async function() {
        let result = await wrapped;
        expect(result.isEmpty()).to.be.false;
      });

      it('isError should return false', async function() {
        let result = await wrapped;
        expect(result.isError()).to.be.false;
      });

      it('isOk should return true', async function() {
        let result = await wrapped;
        expect(result.isOk()).to.be.true;
      });

      it('val should return wrapped value', async function() {
        let result = await wrapped;
        expect(result.val()).to.be.equal(value);
      });
    });

    describe('when wrapped promise which will be resolved', function() {
      let wrapped;
      let value = { foo: 'bar' };
      beforeEach(function() {
        wrapped = toAsyncResult(Promise.resolve(value));
      });

      it('should return promise', function() {
        expect(wrapped).to.be.instanceOf(Promise);
      });

      it('should resolve with AsyncResult instance', async function() {
        expect(await wrapped).to.be.instanceOf(AsyncResult);
      });

      it('isError should return false', async function() {
        let result = await wrapped;
        expect(result.isError()).to.be.false;
      });

      it('isOk should return true', async function() {
        let result = await wrapped;
        expect(result.isOk()).to.be.true;
      });

      it('val should return Promise resolved value', async function() {
        let result = await wrapped;
        expect(result.val()).to.be.equal(value);
      });
    });

    describe('when wrapped promise which will be rejected', function() {
      let wrapped;
      let value = { foo: 'bar' };
      beforeEach(function() {
        wrapped = toAsyncResult(Promise.reject(value));
      });

      it('should return promise', function() {
        expect(wrapped).to.be.instanceOf(Promise);
      });

      it('should resolve with AsyncResult instance', async function() {
        expect(await wrapped).to.be.instanceOf(AsyncResult);
      });

      it('isError should return true', async function() {
        let result = await wrapped;
        expect(result.isError()).to.be.true;
      });

      it('isOk should return false', async function() {
        let result = await wrapped;
        expect(result.isOk()).to.be.false;
      });

      it('err should return Promise rejected value', async function() {
        let result = await wrapped;
        expect(result.err()).to.be.equal(value);
      });
    });

    describe('when wrapped given resolved AsyncResult instance', function() {
      let wrapped;
      let value = new AsyncResult(null, { foo: 'bar' });
      beforeEach(function() {
        wrapped = toAsyncResult(value);
      });

      it('should return promise', function() {
        expect(wrapped).to.be.instanceOf(Promise);
      });

      it('should resolve with given AsyncResult instance', async function() {
        expect(await wrapped).to.be.equal(value);
      });
    });

    describe('when wrapped something with own AsyncResult class', function() {
      let wrapped;
      let value = { foo: 'bar' };

      beforeEach(function() {
        wrapped = toAsyncResult(value, OwnAsyncResult);
      });

      it('should return promise', function() {
        expect(wrapped).to.be.instanceOf(Promise);
      });

      it('should resolve with given AsyncResult instance of given class', async function() {
        let result = await wrapped;
        expect(result).to.be.instanceof(OwnAsyncResult);
      });
    });

    describe('when wrapped a promise which will resolved as AsyncResult with value', function() {
      let wrapped;
      let value = new AsyncResult(null, { foo: 'bar' });
      beforeEach(function() {
        wrapped = toAsyncResult(Promise.resolve(value));
      });

      it('should return promise', function() {
        expect(wrapped).to.be.instanceOf(Promise);
      });

      it('should resolve with given AsyncResult instance', async function() {
        expect(await wrapped).to.be.equal(value);
      });
    });

    describe('when wrapped a promise which will resolved as AsyncResult with error', function() {
      let wrapped;
      let value = new AsyncResult(null, { foo: 'bar' });
      beforeEach(function() {
        wrapped = toAsyncResult(Promise.reject(value));
      });

      it('should return promise', function() {
        expect(wrapped).to.be.instanceOf(Promise);
      });

      it('should resolve with given AsyncResult instance', async function() {
        expect(await wrapped).to.be.equal(value);
      });
    });

    describe('when AsyncResult redefined in config', () => {
      beforeEach(() => {
        config.AsyncResult = OwnAsyncResult;
      });
      afterEach(() => {
        config.AsyncResult = AsyncResult;
      });
      it('should return instance of provided AsyncResult class by default', async () => {
        let res = await toAsyncResult();
        expect(res).to.be.instanceof(AsyncResult);
        expect(res).to.be.instanceof(OwnAsyncResult);
      })
    });

  });

  describe('## wrapMethod:', function() {
    it('should throw if first argument is not a function', function() {
      expect(wrapMethod).to.throw();
      expect(() => wrapMethod({})).to.throw();
      expect(() => wrapMethod(123)).to.throw();
    });

    it('should call given method once with correct arguments', async function() {
      let spy = this.sinon.spy();
      let methodAsync = wrapMethod(spy);

      await methodAsync(1, 2, 3);
      expect(spy).be.calledOnce.and.calledWith(1, 2, 3);
    });

    it('should call given method once with correct arguments if there is a context provided', async function() {
      let context = {};
      let method = function() { return this; }
      let spy = this.sinon.spy(method);
      let methodAsync = wrapMethod(spy, { context });
      let result = await methodAsync(1, 2, 3);
      expect(spy).be.calledOnce.and.calledWith(1, 2, 3);
      expect(result.val()).to.be.equal(context);
    });

    describe('when there is no context and no own AsyncResult provided', function() {
      let method;
      let methodAsync;
      const expectedResult = 'foo + bar';
      beforeEach(function() {
        method = () => expectedResult;
        methodAsync = wrapMethod(method);
      });
      it('should return function', function() {
        expect(methodAsync).to.be.a('function');
      });
      it('should return AsyncResult instance with expected result after awaiting of call', async function() {
        let result = await methodAsync();
        expect(result).to.be.instanceOf(AsyncResult);
        expect(result.val()).to.be.equal(expectedResult);
      });
    });

    describe('when there is context provided', function() {
      const context = { foo: 'bar' };
      let method;
      let methodAsync;

      beforeEach(function() {
        method = function() {
          return this;
        };
        methodAsync = wrapMethod(method, { context });
      });
      it('should return function', function() {
        expect(methodAsync).to.be.a('function');
      });

      it('should call wrapped method binded to a context', async function() {
        let result = await methodAsync();
        expect(result.val()).to.be.equal(context);
      });
    });

    describe('when there is own AsyncResult provided', function() {
      const expectedResult = { foo: 'bar' };
      let method;
      let methodAsync;

      beforeEach(function() {
        method = function() {
          return expectedResult;
        };
        methodAsync = wrapMethod(method, { AsyncResult: OwnAsyncResult });
      });

      it('should return function', function() {
        expect(methodAsync).to.be.a('function');
      });

      it('should return OwnAsyncResult instance with expected result after awaiting of call', async function() {
        let result = await methodAsync();
        expect(result).to.be.instanceOf(OwnAsyncResult);
        expect(result.val()).to.be.equal(expectedResult);
      });
    });

    describe('when there is own AsyncResult and context provided', function() {
      const context = { foo: 'bar' };
      let method;
      let methodAsync;

      beforeEach(function() {
        method = function() {
          return this;
        };
        methodAsync = wrapMethod(method, {
          context,
          AsyncResult: OwnAsyncResult
        });
      });

      it('should return function', function() {
        expect(methodAsync).to.be.a('function');
      });

      it('should call wrapped method binded to a context', async function() {
        let result = await methodAsync();
        expect(result.val()).to.be.equal(context);
      });

      it('should return OwnAsyncResult instance with expected result after awaiting of call', async function() {
        let result = await methodAsync();
        expect(result).to.be.instanceOf(OwnAsyncResult);
        expect(result.val()).to.be.equal(context);
      });
    });

    describe('when own AsyncResult defined in config', () => {
      let method;
      let methodAsync;
      let context;
      beforeEach(() => {
        context = { foo: 123 };
        config.AsyncResult = OwnAsyncResult;
        method = sinon.spy(function() { return this; });
        methodAsync = wrapMethod(method, { context });
      });
      afterEach(() => {
        config.AsyncResult = AsyncResult;
      });

      it('should return function', function() {
        expect(methodAsync).to.be.a('function');
      });

      it('should call wrapped method only once', async function() {
        await methodAsync();
        expect(method).to.be.calledOnce;
      });

      it('should return OwnAsyncResult instance with expected result after awaiting of call', async function() {
        let result = await methodAsync();
        expect(result).to.be.instanceOf(OwnAsyncResult);
        expect(result.val()).to.be.equal(context);
      });
    });

    describe('when there is a runtime error in wrapedMethod', function() {
      let method;
      let methodAsync;
      beforeEach(function() {
        method = function() {
          return someNotDefinedVariable; //eslint-disable-line
        };
        methodAsync = wrapMethod(method);
      });

      it('should return AsyncResult instance with runtime error', async function() {
        let result = await methodAsync();
        expect(result).to.be.instanceOf(AsyncResult);
        expect(result.err()).to.be.instanceOf(Error);
      });
    });
  });

  describe('## addAsync:', function() {
    const context = {
      foo() {
        return Promise.reject('foo');
      },
      bar() {
        return 'bar';
      },
      baz() {
        return Promise.resolve('baz');
      },
      test() {
        return this;
      }
    };
    afterEach(function() {
      delete context.fooAsync;
      delete context.barAsync;
      delete context.bazAsync;
    });

    describe('when calling for single method', function() {
      beforeEach(function() {
        addAsync(context, 'bar');
      });
      it('should add barAsync method to the context', function() {
        expect(context)
          .to.have.property('barAsync')
          .and.to.be.a('function');
      });
      it('should return AsyncResult and expected result when waiting call of added method', async function() {
        let result = await context.barAsync();
        expect(result).to.be.instanceOf(AsyncResult);
        expect(result.val()).to.be.equal('bar');
      });
    });

    describe('when calling for multiple methods', function() {
      beforeEach(function() {
        addAsync(context, ['bar', 'foo']);
      });
      it('should add barAsync and fooAsync methods to the context', function() {
        expect(context)
          .to.have.property('barAsync')
          .and.to.be.a('function');
        expect(context)
          .to.have.property('fooAsync')
          .and.to.be.a('function');
      });
      it('should return AsyncResult and expected result when waiting call of added fooAsync method', async function() {
        let result = await context.fooAsync();
        expect(result).to.be.instanceOf(AsyncResult);
        expect(result.err()).to.be.equal('foo');
      });
    });

    describe('when applying to prototype', function() {
      let Cls;
      let instance;
      beforeEach(() => {
        Cls = function() {};
        Cls.prototype = Object.assign({}, context);
        addAsync(Cls.prototype, ['test'], { context: null });
        instance = new Cls();
      });
      it('should bind context correctly', async () => {
        let result = await instance.testAsync();
        expect(result, 'be AsyncResult').to.be.instanceOf(AsyncResult);
        expect(result.val(), 'be instance').to.be.equal(instance);
      });
    });
    
    describe('when applying to class', function() {
      let Cls;
      let instance;
      beforeEach(() => {
        Cls = function() {};
        Cls.staticTest = function() { return this; };
        Cls.prototype = Object.assign({}, context);
        addAsync(Cls, ['test']);
        addAsync(Cls, ['staticTest'], { static: true });
        instance = new Cls();
      });
      it('should bind context correctly', async () => {
        let result = await instance.testAsync();
        expect(Cls.testAsync).to.be.undefined;
        expect(result, 'be AsyncResult').to.be.instanceOf(AsyncResult);
        expect(result.val(), 'be instance').to.be.equal(instance);
      });
      it('should use class static methods if option `static` is true', async () => {
        expect(Cls.staticTestAsync).to.be.a('function');
        let result = await Cls.staticTestAsync();
        expect(result).to.be.instanceOf(AsyncResult);
        expect(result.val()).to.be.equal(Cls);
      });
    });


  });
});
