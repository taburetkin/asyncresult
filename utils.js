import config from './config';

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

function wrapMethod(method, { context, AsyncResult } = {}) {
  if (typeof method !== 'function') {
    throw new Error('first argument should be a function');
  }
  !AsyncResult && (AsyncResult = config.AsyncResult);

  let asyncMethod = function() {
    try {
      let result = method.apply(this, arguments);
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

function addAsync(context, methodName, options = {}) {
  if (Array.isArray(methodName)) {
    for (let x = 0; x < methodName.length; x++) {
      addAsync(context, methodName[x], options);
    }
  } else {
    if (options.context == null) {
      options.context = context;
    }
    context[methodName + 'Async'] = wrapMethod(context[methodName], options);
  }
}

export { toAsyncResult, wrapMethod, addAsync };
