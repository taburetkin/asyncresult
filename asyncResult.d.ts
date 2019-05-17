export default class AsyncResult<V, E = Error>
{
    static fail<E>( err: E ): AsyncResult<never, E>;
    static success<V>( data ): AsyncResult<V, never>;

    public constructor( err?: E, val?: V );

    hasValue(): boolean;
    isError(): boolean;
    isOk(): boolean;

    errOrVal(): E | V | undefined;
    err(): E | undefined;
    val(): V | undefined;

    setValue( value: V ): void;
    setError( error: E ): void;
}
