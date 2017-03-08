import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class ATRInput extends IndicatorInput {
    low: number[];
    high: number[];
    close: number[];
    period: number;
}
export declare class ATR extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: ATRInput);
    static calculate(input: ATRInput): number[];
    nextValue(price: number): number | undefined;
}
