import { CandleData, CandleList } from '../StockData';
/**
 * Created by AAravindan on 5/4/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class HeikinAshiInput extends IndicatorInput {
    low?: number[];
    open?: number[];
    volume?: number[];
    high?: number[];
    close?: number[];
    timestamp?: number[];
}
export declare class HeikinAshi extends Indicator {
    result: CandleList;
    generator: IterableIterator<CandleData | undefined>;
    constructor(input: HeikinAshiInput);
    static calculate: typeof heikinashi;
    nextValue(price: CandleData): CandleData | undefined;
}
export declare function heikinashi(input: HeikinAshiInput): CandleList;
