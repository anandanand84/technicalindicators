import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class LowestInput extends IndicatorInput {
    values: number[];
    period: number;
}
export declare class Lowest extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: LowestInput);
    static calculate: typeof lowest;
    nextValue(price: number): number | undefined;
}
export declare function lowest(input: LowestInput): number[];
