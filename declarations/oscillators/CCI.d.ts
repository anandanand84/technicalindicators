import { CandleData } from '../StockData';
import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class CCIInput extends IndicatorInput {
    high: number[];
    low: number[];
    close: number[];
    period: number;
}
export declare class CCI extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: CCIInput);
    static calculate: typeof cci;
    nextValue(price: CandleData): number | undefined;
}
export declare function cci(input: CCIInput): number[];
