"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Future_1 = require("./Future");
class Event {
    constructor(subscribe) {
        this._listeners = new Set();
        this._subscribe = subscribe;
    }
    _start() {
        if (this._unsubscribe)
            return;
        this._unsubscribe = this._subscribe((value) => {
            for (const listener of this._listeners) {
                listener(value);
            }
        });
    }
    _stop() {
        if (!this._unsubscribe)
            return;
        this._unsubscribe();
        this._unsubscribe = undefined;
    }
    subscribe(listener) {
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
    // async generator
    wait() {
        return new Promise((resolve) => {
            const sub = this.subscribe((value) => {
                sub.release();
                resolve(value);
            });
        });
    }
    [Symbol.asyncIterator]() {
        let future = new Future_1.Future();
        const sub = this.subscribe((value) => {
            future.resolve(value);
        });
        return {
            next: async () => {
                const val = await future.promise;
                future = new Future_1.Future();
                return {
                    done: false,
                    value: val,
                };
            },
            return: async () => {
                sub.release();
                return {
                    done: true,
                    value: undefined,
                };
            },
        };
    }
    // dom style
    addEventListener(_name, listener) {
        return this.subscribe(listener);
    }
    removeEventListener(_name, listener) {
        this._listeners.delete(listener);
        if (this._listeners.size === 0) {
            this._stop();
        }
    }
    // node.js style
    on(name, listener) {
        this.addEventListener(name, listener);
        return this;
    }
    off(name, listener) {
        this.removeEventListener(name, listener);
        return this;
    }
    once(_name, listener) {
        const sub = this.subscribe((value) => {
            sub.release();
            listener(value);
        });
        return this;
    }
    addListener(name, listener) {
        this.addEventListener(name, listener);
        return this;
    }
    removeListener(name, listener) {
        this.removeEventListener(name, listener);
        return this;
    }
}
exports.Event = Event;
class StatefulEvent extends Event {
}
exports.StatefulEvent = StatefulEvent;
//# sourceMappingURL=Event.js.map