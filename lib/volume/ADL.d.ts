import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CandleData } from '../StockData';
export declare class ADLInput extends IndicatorInput {
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
}
export declare class ADL extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: ADLInput);
    static calculate(input: ADLInput): number[];
    nextValue(price: CandleData): number | undefined;
}
