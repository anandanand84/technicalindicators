import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class ROCInput extends IndicatorInput {
    period: number;
    values: number[];
}
export declare class ROC extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: ROCInput);
    static calculate: typeof roc;
    nextValue(price: number): number | undefined;
}
export declare function roc(input: ROCInput): number[];
