import { Releaseable } from './Releaseable';
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
export declare type ASD = Observable<any> & SubscriptionObserver<any>;
declare type UnsubscribeFunc = () => void;
declare type EmitFunc<T> = (value: T) => void;
declare type SubscribeFunc<T> = (emit: EmitFunc<T>) => UnsubscribeFunc;
export declare class Event<T> {
    private _subscribe;
    constructor(subscribe: SubscribeFunc<T>);
    subscribe(listener: (value: T) => void): {
        release: UnsubscribeFunc;
        unsubscribe: UnsubscribeFunc;
        closed: boolean;
    };
    addEventListener(_name: 'event', listener: (value: T) => void): void;
    removeEventListener(_name: 'event', listener: (value: T) => void): void;
}
/**
 *
 */
export declare class Timer {
    static timeout(callback: () => void, ms: number): Releaseable;
    static interval(callback: () => void, ms: number): Releaseable;
    static delay(ms: number): Promise<void> & Releaseable;
    static periodic(ms: number): Releaseable;
}
export {};
