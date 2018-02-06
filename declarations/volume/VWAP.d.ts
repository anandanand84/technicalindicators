import { CandleData } from '../StockData';
import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class VWAPInput extends IndicatorInput {
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
}
export declare class VWAP extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: VWAPInput);
    static calculate: typeof vwap;
    nextValue(price: CandleData): number | undefined;
}
export declare function vwap(input: VWAPInput): number[];
