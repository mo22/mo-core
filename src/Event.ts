import { Releaseable } from './Releaseable';
import { Future } from './Future';



export type EventUnsubscribeFunc = () => void;
export type EventEmitFunc<T> = (value: T) => void;
export type EventSubscribeFunc<T> = (emit: EventEmitFunc<T>) => EventUnsubscribeFunc;
export type EventListenerFunc<T> = (value: T) => void;



export class Event<T> implements AsyncIterable<T> {
  protected _subscribe: EventSubscribeFunc<T>;
  protected _unsubscribe?: EventUnsubscribeFunc;
  protected _listeners = new Set<EventListenerFunc<T>>();

  public constructor(subscribe: EventSubscribeFunc<T>) {
    this._subscribe = subscribe;
  }

  protected _emit(value: T) {
    for (const listener of this._listeners) {
      listener(value);
    }
  }

  protected _start() {
    if (this._unsubscribe) return;
    this._unsubscribe = this._subscribe((value) => {
      this._emit(value);
    });
  }

  protected _stop() {
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
  private _value: T;

  public constructor(initial: T, subscribe: EventSubscribeFunc<T>) {
    super(subscribe);
    this._value = initial;
  }

  public get value() {
    return this._value;
  }

  protected _emit(value: T) {
    this._value = value;
    super._emit(value);
  }
}
