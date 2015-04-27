// Copyright (c) 2015 Rogier Schouten<github@workingcode.ninja>
/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require("assert");
var Listenable = (function () {
    function Listenable() {
    }
    /**
     * Attach an event handler
     * @param boundTo (Optional) The this argument of the handler
     * @param handler The function to call.
     */
    Listenable.prototype.attach = function (a1, a2) {
        var boundTo;
        var handler;
        if (typeof a1 === "function") {
            handler = a1;
        }
        else {
            assert(typeof a1 === "object", "Expect a function or object as first argument");
            assert(typeof a2 === "function", "Expect a function as second argument");
            boundTo = a1;
            handler = a2;
        }
        if (!this._listeners) {
            this._listeners = [];
        }
        this._listeners.push({
            deleted: false,
            boundTo: boundTo,
            handler: handler
        });
    };
    /**
     * Detach implementation. See the overloads for description.
     */
    Listenable.prototype.detach = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!this._listeners) {
            return;
        }
        var boundTo;
        var handler;
        if (args.length >= 1) {
            if (typeof (args[0]) === "function") {
                handler = args[0];
            }
            else {
                boundTo = args[0];
            }
        }
        if (args.length >= 2) {
            handler = args[1];
        }
        // remove listeners AND mark them as deleted so subclasses don't send any more events to them
        this._listeners = this._listeners.filter(function (listener) {
            if ((typeof handler === "undefined" || listener.handler === handler)
                && (typeof boundTo === "undefined" || listener.boundTo === boundTo)) {
                listener.deleted = true;
                return false;
            }
            return true;
        });
        if (this._listeners.length === 0) {
            delete this._listeners;
        }
    };
    Listenable.prototype.listenerCount = function () {
        return (this._listeners ? this._listeners.length : 0);
    };
    Listenable.prototype._copyListeners = function () {
        if (!this._listeners) {
            return [];
        }
        else {
            return this._listeners.map(function (listener) {
                return listener;
            });
        }
    };
    return Listenable;
})();
exports.Listenable = Listenable;
//# sourceMappingURL=listenable.js.map