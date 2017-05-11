export declare class LinkedList {
    private _head;
    private _tail;
    private _next;
    private _length;
    private _current;
    constructor();
    readonly head: any;
    readonly tail: any;
    readonly current: any;
    readonly length: any;
    push(data: any): void;
    pop(): any;
    shift(): any;
    unshift(data: any): void;
    unshiftCurrent(): any;
    removeCurrent(): any;
    resetCursor(): this;
    next(): any;
}
