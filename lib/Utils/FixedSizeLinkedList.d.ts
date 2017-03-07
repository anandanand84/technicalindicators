/// <reference types="linkedlist" />
import linkedlist = require('linkedlist');
export default class FixedSizeLinkedList extends linkedlist {
    size: number;
    maintainHigh: boolean;
    maintainLow: boolean;
    private periodHigh;
    private periodLow;
    lastShift: number;
    _push: (data: number) => void;
    constructor(size: number, maintainHigh: boolean, maintainLow: boolean);
    add(data: number): void;
    iterator: () => IterableIterator<any>;
    calculatePeriodHigh(): void;
    calculatePeriodLow(): void;
}
