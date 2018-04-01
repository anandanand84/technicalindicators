import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class SumInput extends IndicatorInput {
    values: number[];
    period: number;
}
export declare class Sum extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: SumInput);
    static calculate: typeof sum;
    nextValue(price: number): number | undefined;
}
export declare function sum(input: SumInput): number[];
