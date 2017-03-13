import { Indicator } from '../indicator/indicator';
import { MAInput } from './SMA';
export declare class WEMA extends Indicator {
    period: number;
    price: number[];
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: MAInput);
    static calculate: typeof wema;
    nextValue(price: number): number | undefined;
}
export declare function wema(input: MAInput): number[];
