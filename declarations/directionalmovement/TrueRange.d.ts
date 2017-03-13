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
    static calculate: typeof truerange;
    nextValue(price: CandleData): number | undefined;
}
export declare function truerange(input: TrueRangeInput): number[];
