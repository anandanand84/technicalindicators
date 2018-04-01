import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class HighestInput extends IndicatorInput {
    values: number[];
    period: number;
}
export declare class Highest extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: HighestInput);
    static calculate: typeof highest;
    nextValue(price: number): number | undefined;
}
export declare function highest(input: HighestInput): number[];
