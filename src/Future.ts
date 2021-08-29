/**
 * doc future ...
 */
export class Future<T> implements Promise<T> {
  private _promise: Promise<T>;
  private _resolve?: (value: T | PromiseLike<T>) => void;
  private _reject?: (reason?: any) => void;
  private _value?: T;
  private _error?: any;
  private _resolved = false;

  public constructor() {
    this._promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this._promise.then((val) => {
      this._value = val;
      this._resolved = true;
    });
    this._promise.catch((val) => {
      this._error = val;
      this._resolved = true;
    });
  }

  public get promise(): Promise<T> {
    return this._promise;
  }

  public get reject() {
    return this._reject!;
  }

  public get resolve() {
    return this._resolve!;
  }

  public get resolved() {
    return this._resolved;
  }

  public get value(): T|undefined {
    return this._value;
  }

  public get error(): T|undefined {
    return this._error;
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
