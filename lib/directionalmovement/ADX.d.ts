import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class ADXInput extends IndicatorInput {
    high: number[];
    low: number[];
    close: number[];
    period: number;
}
export declare class ADX extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: ADXInput);
    static calculate(input: ADXInput): number[];
    nextValue(price: number): number | undefined;
}
