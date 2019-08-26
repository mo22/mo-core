import { Releaseable } from './Releaseable';
import { Event } from './Event';
/**
 *
 */
export declare class Timer {
    static timeout(callback: () => void, ms: number): Releaseable;
    static interval(callback: () => void, ms: number): Releaseable;
    static delay(ms: number): Promise<void> & Releaseable;
    static periodic(ms: number): Event<void>;
}
