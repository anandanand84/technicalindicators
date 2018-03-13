import { CandleData } from '../StockData';
/**
 * Created by AAravindan on 5/4/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class TypicalPriceInput extends IndicatorInput {
    low?: number[];
    high?: number[];
    close?: number[];
}
export declare class TypicalPrice extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: TypicalPriceInput);
    static calculate: typeof typicalprice;
    nextValue(price: CandleData): number | undefined;
}
export declare function typicalprice(input: TypicalPriceInput): number[];
