import { Releaseable } from './Releaseable';
import { Future } from './Future';
import { Event } from './Event';



/**
 *
 */
export class Timer {

  public static timeout(callback: () => void, ms: number): Releaseable {
    const handle = setTimeout(callback, ms);
    return {
      release: () => clearTimeout(handle),
    };
  }

  public static interval(callback: () => void, ms: number): Releaseable {
    const handle = setInterval(callback, ms);
    return {
      release: () => clearInterval(handle),
    };
  }

  public static delay(ms: number): Promise<void> & Releaseable {
    const future = new Future<void>();
    const timer = this.timeout(future.resolve, ms);
    return Object.assign(future.promise, timer);
  }

  public static periodic(ms: number): Event<void> {
    return new Event((emit) => {
      const timer = this.interval(() => {
        emit();
      }, ms);
      return () => {
        timer.release();
      };
    });
  }

}
