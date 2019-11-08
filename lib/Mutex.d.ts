/**
 * @TODO: acquire(), release()
 * @TODO: timeout?
 */
export declare class Mutex {
    private _locked;
    private _notify?;
    get locked(): boolean;
    /** wait until lock is free and then run callback */
    run<T>(callback: () => Promise<T>): Promise<T>;
}
