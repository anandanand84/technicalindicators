import { CandleData } from '../StockData';
import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class TrueRangeInput extends IndicatorInput {
    low: number[];
    high: number[];
    close: number[];
}
export declare class TrueRange extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: TrueRangeInput);
    static calculate(input: TrueRangeInput): number[];
    nextValue(price: CandleData): number | undefined;
}
