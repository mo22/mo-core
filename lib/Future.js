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
}
exports.Future = Future;
//# sourceMappingURL=Future.js.map