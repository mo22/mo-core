"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class Timer {
    // public static timeout(): Releaseable
    // public static interval(): Releaseable
    static delay(ms) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), ms);
        });
    }
}
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map