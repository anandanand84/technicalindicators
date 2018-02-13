/**
 * Created by AAravindan on 5/7/16.
 */
import { LinkedList } from './LinkedList';
export default class FixedSizeLinkedList extends LinkedList {
    size: number;
    maintainHigh: boolean;
    maintainLow: boolean;
    periodHigh: number;
    periodLow: number;
    lastShift: number;
    _push: (data: number) => void;
    constructor(size: number, maintainHigh?: boolean, maintainLow?: boolean);
    add(data: number): void;
    iterator(): IterableIterator<any>;
    calculatePeriodHigh(): void;
    calculatePeriodLow(): void;
}
