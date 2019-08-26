import { Releaseable } from './Releaseable';
export declare type EventUnsubscribeFunc = () => void;
export declare type EventEmitFunc<T> = (value: T) => void;
export declare type EventSubscribeFunc<T> = (emit: EventEmitFunc<T>) => EventUnsubscribeFunc;
export declare type EventListenerFunc<T> = (value: T) => void;
export declare class Event<T> implements AsyncIterable<T> {
    private _subscribe;
    private _unsubscribe?;
    private _listeners;
    constructor(subscribe: EventSubscribeFunc<T>);
    private _start;
    private _stop;
    subscribe(listener: EventListenerFunc<T>): Releaseable;
    wait(): Promise<T>;
    [Symbol.asyncIterator](): AsyncIterator<T>;
    addEventListener(_name: 'event', listener: EventListenerFunc<T>): Releaseable;
    removeEventListener(_name: 'event', listener: EventListenerFunc<T>): void;
    on(name: 'event', listener: EventListenerFunc<T>): this;
    off(name: 'event', listener: EventListenerFunc<T>): this;
    once(_name: 'event', listener: EventListenerFunc<T>): this;
    addListener(name: 'event', listener: EventListenerFunc<T>): this;
    removeListener(name: 'event', listener: EventListenerFunc<T>): this;
}
export declare class StatefulEvent<T> extends Event<T> {
}
