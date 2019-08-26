/**
 *
 */
export class Timer {

  // public static timeout(): Releaseable
  // public static interval(): Releaseable

  public static delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

}
