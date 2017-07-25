import { MAInput } from './SMA';
import { Indicator } from '../indicator/indicator';
export declare class WilderSmoothing extends Indicator {
    period: number;
    price: number[];
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: MAInput);
    static calculate: typeof wildersmoothing;
    nextValue(price: number): number | undefined;
}
export declare function wildersmoothing(input: MAInput): number[];
