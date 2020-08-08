"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const Future_1 = require("./Future");
const Event_1 = require("./Event");
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
        return Object.assign(future.promise, timer);
    }
    static periodic(ms) {
        return new Event_1.Event((emit) => {
            const timer = this.interval(() => {
                emit();
            }, ms);
            return () => {
                timer.release();
            };
        });
    }
}
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map