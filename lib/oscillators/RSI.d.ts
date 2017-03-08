import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class RSIInput extends IndicatorInput {
    period: number;
    values: number[];
}
export declare class RSI extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: RSIInput);
    static calculate(input: RSIInput): number[];
    nextValue(price: number): number | undefined;
}
