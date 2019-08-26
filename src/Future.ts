/**
 * doc future ...
 */
export class Future<T> implements Promise<T> {
  private _promise: Promise<T>;
  private _resolve?: (value?: T | PromiseLike<T> | undefined) => void;
  private _reject?: (reason?: any) => void;

  constructor() {
    this._promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  get promise(): Promise<T> {
    return this._promise;
  }

  get reject() {
    return this._reject!;
  }

  get resolve() {
    return this._resolve!;
  }

  // make it possible to use this directly as promise

  get [Symbol.toStringTag]() {
    return this._promise[Symbol.toStringTag];
  }

  public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
    return this._promise.then(onfulfilled, onrejected);
  }

  public catch(cb: ((reason: any) => PromiseLike<never>) | null | undefined) {
    return this._promise.catch(cb);
  }

  public finally(onfinally?: (() => void) | undefined | null): Promise<T> {
    return this._promise.finally(onfinally);
  }
}
