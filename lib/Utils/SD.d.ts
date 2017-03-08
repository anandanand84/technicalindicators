import { IndicatorInput, Indicator } from '../indicator/indicator';
export declare class SDInput extends IndicatorInput {
    period: number;
    values: number[];
}
export declare class SD extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: SDInput);
    static calculate(input: SDInput): number[];
    nextValue(price: number): number | undefined;
}
