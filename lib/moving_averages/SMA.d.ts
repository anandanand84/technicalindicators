import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class MAInput extends IndicatorInput {
    period: number;
    values: number[];
    constructor(period: number, values: number[]);
}
export declare class SMA extends Indicator {
    period: number;
    price: number[];
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: MAInput);
    static calculate(input: MAInput): number[];
    nextValue(price: number): number | undefined;
}
