import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class AvgLossInput extends IndicatorInput {
    values: number[];
    period: number;
}
export declare class AverageLoss extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: AvgLossInput);
    static calculate(input: AvgLossInput): number[];
    nextValue(price: number): number | undefined;
}
