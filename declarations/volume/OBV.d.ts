import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CandleData } from '../StockData';
export declare class OBVInput extends IndicatorInput {
    close: number[];
    volume: number[];
}
export declare class OBV extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: OBVInput);
    static calculate: typeof obv;
    nextValue(price: CandleData): number | undefined;
}
export declare function obv(input: OBVInput): number[];
