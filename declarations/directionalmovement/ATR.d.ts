import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CandleData } from '../StockData';
export declare class ATRInput extends IndicatorInput {
    low: number[];
    high: number[];
    close: number[];
    period: number;
}
export declare class ATR extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: ATRInput);
    static calculate: typeof atr;
    nextValue(price: CandleData): number | undefined;
}
export declare function atr(input: ATRInput): number[];
