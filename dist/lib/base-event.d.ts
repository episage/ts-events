/// <reference path="../../typings/tsd.d.ts" />
export interface Postable<T> {
    post(data: T): void;
}
/**
 * Internal interface between BaseEvent and its subclasses
 */
export interface Listener<T> {
    /**
     * Indicates that the listener was detached
     */
    deleted: boolean;
    /**
     * The handler
     */
    handler?: (data: T) => void;
    /**
     * The this pointer for the handler
     */
    boundTo?: Object;
    /**
     * Instead of a handler, an attached event
     */
    event?: Postable<T>;
}
/**
 * Base class for events.
 * Handles attaching and detaching listeners
 */
export declare class BaseEvent<T> implements Postable<T> {
    /**
     * Attached listeners. NOTE: do not modify.
     * Instead, replace with a new array with possibly the same elements. This ensures
     * that any references to the array by events that are underway remain the same.
     */
    protected _listeners: Listener<T>[];
    /**
     * Attach an event handler
     * @param handler The function to call. The this argument of the function will be this object.
     */
    attach(handler: (data: T) => void): void;
    /**
     * Attach an event handler
     * @param boundTo The this argument of the handler
     * @param handler The function to call.
     */
    attach(boundTo: Object, handler: (data: T) => void): void;
    /**
     * Attach an event directly
     * @param event The event to be posted
     */
    attach(event: Postable<T>): void;
    /**
     * Detach all listeners with the given handler function
     */
    detach(handler: (data: T) => void): void;
    /**
     * Detach all listeners with the given handler function and boundTo object.
     */
    detach(boundTo: Object, handler: (data: T) => void): void;
    /**
     * Detach all listeners that were attached with the given boundTo object.
     */
    detach(boundTo: Object): void;
    /**
     * Detach the given event.
     */
    detach(event: Postable<T>): void;
    /**
     * Detach all listeners
     */
    detach(): void;
    /**
     * Abstract post() method to be able to connect any type of event to any other directly
     * @abstract
     */
    post(data: T): void;
    /**
     * The number of attached listeners
     */
    listenerCount(): number;
    /**
     * Call the given listener, if it is not marked as 'deleted'
     * @param listener The listener to call
     * @param args The arguments to the handler
     */
    protected _call(listener: Listener<T>, args: any[]): void;
}
