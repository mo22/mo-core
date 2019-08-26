"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * doc future ...
 */
class Future {
    constructor() {
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
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