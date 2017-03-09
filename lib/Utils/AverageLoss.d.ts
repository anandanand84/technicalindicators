import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class AvgLossInput extends IndicatorInput {
    values: number[];
    period: number;
}
export declare class AverageLoss extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: AvgLossInput);
    static calculate: typeof averageloss;
    nextValue(price: number): number | undefined;
}
export declare function averageloss(input: AvgLossInput): number[];
