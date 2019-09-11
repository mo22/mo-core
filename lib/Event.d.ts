import { Releaseable } from './Releaseable';
export declare type EventUnsubscribeFunc = () => void;
export declare type EventEmitFunc<T> = (value: T) => void;
export declare type EventSubscribeFunc<T> = (emit: EventEmitFunc<T>) => EventUnsubscribeFunc;
export declare type EventListenerFunc<T> = (value: T) => void;
export declare class Event<T> {
    protected _subscribe: EventSubscribeFunc<T>;
    protected _unsubscribe?: EventUnsubscribeFunc;
    protected _listeners: Set<EventListenerFunc<T>>;
    constructor(subscribe: EventSubscribeFunc<T>);
    protected _emit(value: T): void;
    protected _start(): void;
    protected _stop(): void;
    subscribe(listener: EventListenerFunc<T>): Releaseable;
    private _createSubscribable;
    ['@@observable'](): {
        subscribe: (observer?: {
            next?: ((value: T) => void) | undefined;
        } | ((value: T) => void) | null | undefined) => {
            unsubscribe: () => void;
        };
    };
    wait(): Promise<T>;
    addEventListener(_name: 'event', listener: EventListenerFunc<T>): Releaseable;
    removeEventListener(_name: 'event', listener: EventListenerFunc<T>): void;
    on(name: 'event', listener: EventListenerFunc<T>): this;
    off(name: 'event', listener: EventListenerFunc<T>): this;
    once(_name: 'event', listener: EventListenerFunc<T>): this;
    addListener(name: 'event', listener: EventListenerFunc<T>): this;
    removeListener(name: 'event', listener: EventListenerFunc<T>): this;
}
export declare class StatefulEvent<T> extends Event<T> {
    private _value;
    readonly value: T;
    constructor(initial: T, subscribe: EventSubscribeFunc<T>);
    protected _emit(value: T): void;
    UNSAFE_setValue(value: T): void;
}
