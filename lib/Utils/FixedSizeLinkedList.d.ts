/// <reference types="linkedlist" />
import linkedlist = require('linkedlist');
export default class FixedSizeLinkedList extends linkedlist {
    size: number;
    maintainHigh: boolean;
    maintainLow: boolean;
    periodHigh: number;
    periodLow: number;
    lastShift: number;
    _push: (data: number) => void;
    constructor(size: number, maintainHigh?: boolean, maintainLow?: boolean);
    add(data: number): void;
    iterator(): IterableIterator<number>;
    calculatePeriodHigh(): void;
    calculatePeriodLow(): void;
}
