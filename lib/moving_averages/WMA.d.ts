import { Indicator } from '../indicator/indicator';
import { MAInput } from './SMA';
export declare class WMA extends Indicator {
    period: number;
    price: number[];
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: MAInput);
    static calculate: typeof wma;
    nextValue(price: number): number | undefined;
}
export declare function wma(input: MAInput): number[];
