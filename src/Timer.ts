import { Releaseable } from './Releaseable';
import { Future } from './Future';



interface SubscriptionObserver<T, E = any> {
  next(value: T): void;
  error(errorValue: E): void;
  complete(): void;
  readonly closed: boolean;
}

interface Observer<T, E = any> {
  next?(value: T): void;
  error?(errorValue: E): void;
  complete?(): void;
}

interface Subscription {
  unsubscribe(): void;
  readonly closed: boolean;
}

interface Observable<T, E = any> {
  subscribe(observer: Observer<T, E>): Subscription;
  subscribe(next: Observer<T, E>['next'], error: Observer<T, E>['error'], complete: Observer<T, E>['complete']): Subscription;
}

export type ASD = Observable<any> & SubscriptionObserver<any>;



type UnsubscribeFunc = () => void;
type EmitFunc<T> = (value: T) => void;
type SubscribeFunc<T> = (emit: EmitFunc<T>) => UnsubscribeFunc;

// should work with rxjs observer
// should work with addEventListener
// could work with async generators?
// separate producer and emitter
// extra class that combines them?
// version that keeps the last/initial value?

export class Event<T> {
  private _subscribe: SubscribeFunc<T>;

  public constructor(subscribe: SubscribeFunc<T>) {
    this._subscribe = subscribe;
  }

  public subscribe(listener: (value: T) => void) {
    const unsubscribe = this._subscribe(
      (value) => {
        listener(value);
      },
    );
    return {
      release: unsubscribe,
      unsubscribe: unsubscribe,
      closed: false,
    };
  }

  public addEventListener(_name: 'event', listener: (value: T) => void): void {
    // add listener...
    // save subscription via symbol on listener?
  }

  public removeEventListener(_name: 'event', listener: (value: T) => void): void {
  }

}


/**
 *
 */
export class Timer {

  public static timeout(callback: () => void, ms: number): Releaseable {
    const handle = setTimeout(callback, ms);
    return {
      release: () => clearTimeout(handle),
    };
  }

  public static interval(callback: () => void, ms: number): Releaseable {
    const handle = setInterval(callback, ms);
    return {
      release: () => clearInterval(handle),
    };
  }

  public static delay(ms: number): Promise<void> & Releaseable {
    const future = new Future<void>();
    const timer = this.timeout(future.resolve, ms);
    const result: Promise<void> & Releaseable = { ...future.promise, ...timer };
    return result;
  }

  public static periodic(ms: number): Releaseable {
    const timer = this.interval(() => {}, ms);
    // @TODO: what type here?
    return timer;
  }

}
