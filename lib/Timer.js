"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Future_1 = require("./Future");
// should work with rxjs observer
// should work with addEventListener
// could work with async generators?
// separate producer and emitter
// extra class that combines them?
// version that keeps the last/initial value?
class Event {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }
    subscribe(listener) {
        const unsubscribe = this._subscribe((value) => {
            listener(value);
        });
        return {
            release: unsubscribe,
            unsubscribe: unsubscribe,
            closed: false,
        };
    }
    addEventListener(_name, listener) {
        // add listener...
        // save subscription via symbol on listener?
    }
    removeEventListener(_name, listener) {
    }
}
exports.Event = Event;
/**
 *
 */
class Timer {
    static timeout(callback, ms) {
        const handle = setTimeout(callback, ms);
        return {
            release: () => clearTimeout(handle),
        };
    }
    static interval(callback, ms) {
        const handle = setInterval(callback, ms);
        return {
            release: () => clearInterval(handle),
        };
    }
    static delay(ms) {
        const future = new Future_1.Future();
        const timer = this.timeout(future.resolve, ms);
        const result = { ...future.promise, ...timer };
        return result;
    }
    static periodic(ms) {
        const timer = this.interval(() => { }, ms);
        // @TODO: what type here?
        return timer;
    }
}
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map