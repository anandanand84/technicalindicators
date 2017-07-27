import { CandleData } from '../StockData';
import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class ForceIndexInput extends IndicatorInput {
    close: number[];
    volume: number[];
    period: number;
}
export declare class ForceIndex extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: ForceIndexInput);
    static calculate: typeof forceindex;
    nextValue(price: CandleData): number | undefined;
}
export declare function forceindex(input: ForceIndexInput): number[];
