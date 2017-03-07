import { Indicator } from '../indicator/indicator';
import { MAInput } from './SMA';
export declare class WEMA extends Indicator {
    period: number;
    price: number[];
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: MAInput);
    static calculate(input: MAInput): number[];
    nextValue(price: number): number | undefined;
}
