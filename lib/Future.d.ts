/**
 * doc future ...
 */
export declare class Future<T> {
    private _promise;
    private _resolve?;
    private _reject?;
    constructor();
    readonly promise: Promise<T>;
    readonly reject: (reason?: any) => void;
    readonly resolve: (value?: T | PromiseLike<T> | undefined) => void;
}
