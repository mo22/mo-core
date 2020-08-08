"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Future = void 0;
/**
 * doc future ...
 */
class Future {
    constructor() {
        this._resolved = false;
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this._promise.then((val) => {
            this._value = val;
            this._resolved = true;
        });
        this._promise.catch((val) => {
            this._error = val;
            this._resolved = true;
        });
    }
    get promise() {
        return this._promise;
    }
    get reject() {
        return this._reject;
    }
    get resolve() {
        return this._resolve;
    }
    get resolved() {
        return this._resolved;
    }
    get value() {
        return this._value;
    }
    get error() {
        return this._error;
    }
    // make it possible to use this directly as promise
    get [Symbol.toStringTag]() {
        return this._promise[Symbol.toStringTag];
    }
    then(onfulfilled, onrejected) {
        return this._promise.then(onfulfilled, onrejected);
    }
    catch(cb) {
        return this._promise.catch(cb);
    }
    finally(onfinally) {
        return this._promise.finally(onfinally);
    }
}
exports.Future = Future;
//# sourceMappingURL=Future.js.map