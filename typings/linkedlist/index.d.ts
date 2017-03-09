export = linkedlist
declare class linkedlist {
    constructor();
    _head:number;
    _tail:number;
    _next:number;
    _length:number;
    head :number
    tail :number
    current:number;
    length :number;
    push(data:number):void;
    pop():number;
    shift():number;
    unshift(data:number):void;
    unshiftCurrent():number;
    removeCurrent():number;
    next():number;
    resetCursor():linkedlist;
}   