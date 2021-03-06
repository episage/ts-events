/// <reference path="../../typings/tsd.d.ts" />
import { BaseEvent, Postable, Listener } from './base-event';
/**
 * Options for the AsyncEvent constructor
 */
export interface AsyncEventOpts {
    /**
     * Condense multiple calls to post() into one while the previous one
     * has not been handled yet.
     */
    condensed?: boolean;
}
/**
 * A-synchronous event. Handlers are called in the next Node.JS cycle.
 * - Optionally condenses multiple post() calls into one (the last post() gets through)
 * - Handlers are called only for events posted after they were attached.
 * - Handlers are not called anymore when they are detached, even if a post() is in progress
 */
export declare class AsyncEvent<T> extends BaseEvent<T> implements Postable<T> {
    /**
     * Used internally - the exact options object given to constructor
     */
    options: AsyncEventOpts;
    private _condensed;
    private _queued;
    private _queuedListeners;
    private _queuedData;
    /**
     * The default scheduler uses setImmediate() or setTimeout(..., 0) if setImmediate is not available.
     */
    static defaultScheduler(callback: () => void): void;
    /**
     * The current scheduler
     */
    private static _scheduler;
    /**
     * By default, AsyncEvent uses setImmediate() to schedule event handler invocation.
     * You can change this for e.g. setTimeout(..., 0) by calling this static method once.
     * @param scheduler A function that takes a callback and executes it in the next Node.JS cycle.
     */
    static setScheduler(scheduler: (callback: () => void) => void): void;
    /**
     * Constructor
     * @param opts Optional. Various settings:
     *             - condensed: a Boolean indicating whether to condense multiple post() calls within the same cycle.
     */
    constructor(opts?: AsyncEventOpts);
    /**
     * Send the AsyncEvent. Handlers are called in the next Node.JS cycle.
     */
    post(data: T): void;
    protected _call(listener: Listener<T>, args: any[]): void;
    /**
     * Performance optimization: if this async signal is attached to another
     * async signal, we're already a the next cycle and we can call listeners
     * directly
     */
    protected _postDirect(args: any[]): void;
}
/**
 * Convenience class for AsyncEvents without data
 */
export declare class VoidAsyncEvent extends AsyncEvent<void> {
    /**
     * Send the AsyncEvent.
     */
    post(): void;
}
/**
 * Similar to "error" event on EventEmitter: throws when a post() occurs while no handlers set.
 */
export declare class ErrorAsyncEvent extends AsyncEvent<Error> {
    post(data: Error): void;
}
