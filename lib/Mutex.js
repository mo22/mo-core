"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutex = void 0;
const Future_1 = require("./Future");
/**
 * @TODO: acquire(), release()
 * @TODO: timeout?
 */
class Mutex {
    _locked = false;
    _notify;
    get locked() {
        return this._locked;
    }
    /** wait until lock is free and then run callback */
    async run(callback) {
        while (this._locked) {
            await this._notify;
        }
        this._locked = true;
        this._notify = new Future_1.Future();
        try {
            return await callback();
        }
        finally {
            this._locked = false;
            this._notify.resolve();
        }
    }
}
exports.Mutex = Mutex;
//# sourceMappingURL=Mutex.js.map