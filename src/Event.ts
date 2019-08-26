import { Releaseable } from './Releaseable';
import { Future } from './Future';

export type EventUnsubscribeFunc = () => void;
export type EventEmitFunc<T> = (value: T) => void;
export type EventSubscribeFunc<T> = (emit: EventEmitFunc<T>) => EventUnsubscribeFunc;
export type EventListenerFunc<T> = (value: T) => void;



export interface NextObserver<T> {
    closed?: boolean;
    next: (value: T) => void;
    error?: (err: any) => void;
    complete?: () => void;
}
export interface ErrorObserver<T> {
    closed?: boolean;
    next?: (value: T) => void;
    error: (err: any) => void;
    complete?: () => void;
}
export interface CompletionObserver<T> {
    closed?: boolean;
    next?: (value: T) => void;
    error?: (err: any) => void;
    complete: () => void;
}
export declare type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;

export interface Unsubscribable {
    unsubscribe(): void;
}

export interface Subscribable<T> {
    subscribe(observer?: PartialObserver<T>): Unsubscribable;
    /** @deprecated Use an observer instead of a complete callback */
    subscribe(next: null | undefined, error: null | undefined, complete: () => void): Unsubscribable;
    /** @deprecated Use an observer instead of an error callback */
    subscribe(next: null | undefined, error: (error: any) => void, complete?: () => void): Unsubscribable;
    /** @deprecated Use an observer instead of a complete callback */
    subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): Unsubscribable;
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
}



export class Event<T> implements AsyncIterable<T> {
  private _subscribe: EventSubscribeFunc<T>;
  private _unsubscribe?: EventUnsubscribeFunc;
  private _listeners = new Set<EventListenerFunc<T>>();

  public constructor(subscribe: EventSubscribeFunc<T>) {
    this._subscribe = subscribe;
  }

  private _start() {
    if (this._unsubscribe) return;
    this._unsubscribe = this._subscribe((value) => {
      for (const listener of this._listeners) {
        listener(value);
      }
    });
  }

  private _stop() {
    if (!this._unsubscribe) return;
    this._unsubscribe();
    this._unsubscribe = undefined;
  }

  public subscribe(listener: EventListenerFunc<T>): Releaseable {
    this._start();
    this._listeners.add(listener);
    return {
      release: () => {
        this._listeners.delete(listener);
        if (this._listeners.size === 0) {
          this._stop();
        }
      },
    };
  }

  // observable

  private _createSubscribable() {
    return {
      subscribe: (observer?: null|undefined|((value: T) => void)|{ next?: (value: T) => void; }) => {
        const sub = this.subscribe((value) => {
          if (observer && 'next' in observer && typeof observer.next === 'function') {
            observer.next(value);
          } else if (typeof observer === 'function') {
            observer(value);
          }
        });
        return {
          unsubscribe: () => {
            sub.release();
          },
        };
      },
    };
  }

  public ['@@observable']() {
    return this._createSubscribable();
  }

  public [Symbol.observable]() {
    return this._createSubscribable();
  }

  // async generator

  public wait(): Promise<T> {
    return new Promise<T>((resolve) => {
      const sub = this.subscribe((value) => {
        sub.release();
        resolve(value);
      });
    });
  }

  public [Symbol.asyncIterator](): AsyncIterator<T> {
    let future = new Future<T>();
    const sub = this.subscribe((value) => {
      future.resolve(value);
    });
    return {
      next: async () => {
        const val = await future.promise;
        future = new Future<T>();
        return {
          done: false,
          value: val,
        };
      },
      return: async () => {
        sub.release();
        return {
          done: true,
          value: undefined as any,
        };
      },
    };
  }

  // dom style

  public addEventListener(_name: 'event', listener: EventListenerFunc<T>): Releaseable {
    return this.subscribe(listener);
  }

  public removeEventListener(_name: 'event', listener: EventListenerFunc<T>): void {
    this._listeners.delete(listener);
    if (this._listeners.size === 0) {
      this._stop();
    }
  }

  // node.js style

  public on(name: 'event', listener: EventListenerFunc<T>) {
    this.addEventListener(name, listener);
    return this;
  }

  public off(name: 'event', listener: EventListenerFunc<T>) {
    this.removeEventListener(name, listener);
    return this;
  }

  public once(_name: 'event', listener: EventListenerFunc<T>) {
    const sub = this.subscribe((value) => {
      sub.release();
      listener(value);
    });
    return this;
  }

  public addListener(name: 'event', listener: EventListenerFunc<T>) {
    this.addEventListener(name, listener);
    return this;
  }

  public removeListener(name: 'event', listener: EventListenerFunc<T>) {
    this.removeEventListener(name, listener);
    return this;
  }

}

export class StatefulEvent<T> extends Event<T> {
  // initial value?
}
