import { Future } from './Future';



/**
 * @TODO: acquire(), release()
 * @TODO: timeout?
 */
export class Mutex {
  private _locked: boolean = false;
  private _notify?: Future<void>;

  get locked() {
    return this._locked;
  }

  /** wait until lock is free and then run callback */
  public async run<T>(callback: () => Promise<T>): Promise<T> {
    while (this._locked) {
      await this._notify;
    }
    this._locked = true;
    this._notify = new Future();
    try {
      return await callback();
    } finally {
      this._locked = false;
      this._notify.resolve();
    }
  }
}
