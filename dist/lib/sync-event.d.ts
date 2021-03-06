import { BaseEvent, Postable } from './base-event';
/**
 * This is a true EventEmitter replacement: the handlers are called synchronously when
 * you post the event.
 * - Allows better error handling by aggregating any errors thrown by handlers.
 * - Prevents livelock by throwing an error when recursion depth is above a maximum.
 * - Handlers are called only for events posted after they were attached.
 * - Handlers are not called anymore when they are detached, even if a post() is in progress
 */
export declare class SyncEvent<T> extends BaseEvent<T> implements Postable<T> {
    /**
     * Maximum number of times that an event handler may cause the same event
     * recursively.
     */
    static MAX_RECURSION_DEPTH: number;
    /**
     * Recursive post() invocations
     */
    private _recursion;
    /**
     * Send the event. Handlers are called immediately and synchronously.
     * If an error is thrown by a handler, the remaining handlers are still called.
     * Afterward, an AggregateError is thrown with the original error(s) in its 'causes' property.
     */
    post(data: T): void;
}
/**
 * Convenience class for events without data
 */
export declare class VoidSyncEvent extends SyncEvent<void> {
    /**
     * Send the event.
     */
    post(): void;
}
/**
 * Similar to "error" event on EventEmitter: throws when a post() occurs while no handlers set.
 */
export declare class ErrorSyncEvent extends SyncEvent<Error> {
    post(data: Error): void;
}
