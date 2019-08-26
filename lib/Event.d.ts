import { Releaseable } from './Releaseable';
export declare type EventUnsubscribeFunc = () => void;
export declare type EventEmitFunc<T> = (value: T) => void;
export declare type EventSubscribeFunc<T> = (emit: EventEmitFunc<T>) => EventUnsubscribeFunc;
export declare type EventListenerFunc<T> = (value: T) => void;
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
export declare class Event<T> implements AsyncIterable<T> {
    private _subscribe;
    private _unsubscribe?;
    private _listeners;
    constructor(subscribe: EventSubscribeFunc<T>);
    private _start;
    private _stop;
    subscribe(listener: EventListenerFunc<T>): Releaseable;
    private _createSubscribable;
    ['@@observable'](): {
        subscribe: (observer?: {
            next?: ((value: T) => void) | undefined;
        } | ((value: T) => void) | null | undefined) => {
            unsubscribe: () => void;
        };
    };
    [Symbol.observable](): {
        subscribe: (observer?: {
            next?: ((value: T) => void) | undefined;
        } | ((value: T) => void) | null | undefined) => {
            unsubscribe: () => void;
        };
    };
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
