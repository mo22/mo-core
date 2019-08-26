/**
 * doc future ...
 */
export class Future<T> {
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
}
