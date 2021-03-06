import { BaseEvent, Postable } from './base-event';
import { default as EventQueue } from "./EventQueue";
/**
 * Options for the QueuedEvent constructor
 */
export interface QueuedEventOpts {
    /**
     * Condense multiple calls to post() into one.
     */
    condensed?: boolean;
    /**
     * Specific event queue to use. If not provided, the global instance is used.
     */
    queue?: EventQueue;
}
/**
 * Event that stays in a queue until you process the queue. Allows fine-grained
 * control over when events happen.
 * - Optionally condenses multiple post() calls into one.
 * - Handlers are called only for events posted after they were attached.
 * - Handlers are not called anymore when they are detached, even if a post() is in progress
 */
export declare class QueuedEvent<T> extends BaseEvent<T> implements Postable<T> {
    /**
     * Used internally - the exact options object given to constructor
     */
    options: QueuedEventOpts;
    private _condensed;
    private _queue;
    private _queued;
    private _queuedListeners;
    private _queuedData;
    /**
     * Constructor
     * @param opts Optional, an object with the following members:
     *             - condensed: a Boolean indicating whether to condense multiple calls to post() into one (default false)
     *             - queue: a specific event queue to use. The global EventQueue instance is used if not given.
     */
    constructor(opts?: QueuedEventOpts);
    /**
    * Send the event. Events are queued in the event queue until flushed out.
    * If the 'condensed' option was given in the constructor, multiple posts()
    * between queue flushes are condensed into one call with the data from the
    * last post() call.
    */
    post(data: T): void;
}
/**
 * Convenience class for events without data
 */
export declare class VoidQueuedEvent extends QueuedEvent<void> {
    /**
     * Send the event.
     */
    post(): void;
}
/**
 * Similar to "error" event on EventEmitter: throws when a post() occurs while no handlers set.
 */
export declare class ErrorQueuedEvent extends QueuedEvent<Error> {
    post(data: Error): void;
}
