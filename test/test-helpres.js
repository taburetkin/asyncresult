import { AsyncResult } from '../';

export const OwnAsyncResult = function() {
  AsyncResult.apply(this, arguments);
};
OwnAsyncResult.prototype = Object.create(AsyncResult.prototype);
OwnAsyncResult.prototype.constructor = AsyncResult;
OwnAsyncResult.success = AsyncResult.success;
OwnAsyncResult.fail = AsyncResult.fail;
