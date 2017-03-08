import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class ROCInput extends IndicatorInput {
    period: number;
    values: number[];
}
export declare class ROC extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: ROCInput);
    static calculate(input: ROCInput): number[];
    nextValue(price: number): number | undefined;
}
