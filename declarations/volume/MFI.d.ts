/**
 * Created by AAravindan on 5/17/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CandleData } from '../StockData';
export declare class MFIInput extends IndicatorInput {
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
    period: number;
}
export declare class MFI extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: MFIInput);
    static calculate: typeof mfi;
    nextValue(price: CandleData): number | undefined;
}
export declare function mfi(input: MFIInput): number[];
