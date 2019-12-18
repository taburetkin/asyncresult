import config from './config';

/**
 * Converts given argument to a Promise resolved with AsyncResult instance.
 * In case argument is an Error AsyncResult instance will be created with error.
 * In case argument is a promise which wiil be rejected will create AsyncResult with error
 *
 * @param {*} promise - any argument
 * @param {*} [OwnAsyncResult] - own AsyncResult class, if omitted will be used config's version
 * @returns {Promise} - promise which will be resolved with AsyncResult
 */
function toAsyncResult(promise, OwnAsyncResult) {
  let AsyncResult = OwnAsyncResult || config.AsyncResult;

  const newPromise = new Promise(resolve => {
    // if given argument is AsyncResult then just resolve with it;
    if (promise instanceof AsyncResult) {
      resolve(promise);
    } else if (promise instanceof Error) {
      // if given argument is Error then resolving with error;
      resolve(new AsyncResult(promise));
    } else if (!promise || !promise.then) {
      // if given argument is not promise then successfully resolving with this argument;
      resolve(new AsyncResult(null, promise));
    }

    // if given argument is a promise, then trying to resolve or catch it
    promise
      .then(data => {
        let resolvingWith =
          data instanceof AsyncResult ? data : new AsyncResult(null, data);
        resolve(resolvingWith);
      })
      .catch(error => {
        let resolvingWith =
          error instanceof AsyncResult ? error : new AsyncResult(error);
        resolve(resolvingWith);
      });
  });
  return newPromise;
}

/**
 * Wraps given method, returned result of a method will be instance of AsyncResult
 * @param {function} method - any method you wants to wrap
 * @param {object} [options] - You may specify context and AsyncResult for new method through options
 * @return {function} - wrapped method
 */
function wrapMethod(method, { context, AsyncResult, prototypeMethod, methodName } = {}) {
  if (typeof method !== 'function') {
    throw new Error('first argument should be a function or context should be provided');
  }
  !AsyncResult && (AsyncResult = config.AsyncResult);

  let asyncMethod = function() {
    try {
      let result;
      if (methodName) {
        result = this[methodName].apply(this, arguments);
      } else {
        result = method.apply(this, arguments);
      }
      return toAsyncResult(result, AsyncResult);
    } catch (error) {
      return toAsyncResult(error, AsyncResult);
    }
  };
  if (context) {
    asyncMethod = asyncMethod.bind(context);
  }
  return asyncMethod;
}

/**
 * Adds async versions of provided methods
 * @param {(Object|Class)} context - object literal or class
 * @param {(string|string[])} methodName - method name(s) of provided object.
 * In case context is a class and there is no option `static:true` will use prototype
 * @param {object} options - options. context, static
 * @return {void}
 */
function addAsync(context, methodName, options = {}) {
  if (Array.isArray(methodName)) {
    for (let x = 0; x < methodName.length; x++) {
      addAsync(context, methodName[x], options);
    }
  } else {
    let isCtor = typeof context === 'function';
    options.methodName = methodName;
    if (isCtor && !options.static) {
      context = context.prototype
      options.prototypeMethod = true;
    }
    if (!isCtor && options.context === void 0) {
      options.context = context;
    }
    context[methodName + 'Async'] = wrapMethod(context[methodName], options);
  }
}

export { toAsyncResult, wrapMethod, addAsync };
