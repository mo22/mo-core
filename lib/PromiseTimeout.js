"use strict";
// PromiseTimeoutError ?!
Object.defineProperty(exports, "__esModule", { value: true });
function timeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_resolve, reject) => {
            let timeout = setTimeout(() => {
                reject(new Error('timeout'));
            }, ms);
            if (timeout && typeof timeout === 'object' && timeout.unref)
                timeout.unref();
        }),
    ]);
}
exports.timeout = timeout;
//# sourceMappingURL=PromiseTimeout.js.map