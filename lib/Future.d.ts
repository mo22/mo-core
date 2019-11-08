/**
 * doc future ...
 */
export declare class Future<T> implements Promise<T> {
    private _promise;
    private _resolve?;
    private _reject?;
    private _value?;
    private _error?;
    private _resolved;
    constructor();
    get promise(): Promise<T>;
    get reject(): (reason?: any) => void;
    get resolve(): (value?: T | PromiseLike<T> | undefined) => void;
    get resolved(): boolean;
    get value(): T | undefined;
    get error(): T | undefined;
    get [Symbol.toStringTag](): string;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch(cb: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<T>;
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
