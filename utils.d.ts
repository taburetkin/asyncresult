import AsyncResult from './asyncResult';



export const toAsyncResult: {
    <E extends Error>(
        error: E,
        OwnAsyncResult?: typeof AsyncResult,
    ): Promise<AsyncResult<never, E>>;
    <V, E>(
        asyncResult: AsyncResult<V, E>,
        OwnAsyncResult?: typeof AsyncResult,
    ): Promise<AsyncResult<V, E>>;
    <V>(
        value: V,
        OwnAsyncResult?: typeof AsyncResult,
    ): Promise<AsyncResult<V, null>>;
};

export const wrapMethod: {
    <T, P extends any[], R>(
        method: (this: T, ...parameters: P ) => Promise<R> | R,
        options?: {
            context?: T,
            AsyncResult?: typeof AsyncResult,
        }
    ): AsyncResult<R>;
};

export const addAsync: {
    <T, K extends keyof T>(
        context: T,
        methodName: K | K[],
        options?: { context?: T }
    ): void;
};
