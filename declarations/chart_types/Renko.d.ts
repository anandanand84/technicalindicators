import { CandleList } from '../StockData';
/**
 * Created by AAravindan on 5/4/16.
 */
import { IndicatorInput } from '../indicator/indicator';
export declare class RenkoInput extends IndicatorInput {
    period?: number;
    brickSize?: number;
    useATR?: boolean;
    low?: number[];
    open?: number[];
    volume?: number[];
    high?: number[];
    close?: number[];
    timestamp?: number[];
}
export declare function renko(input: RenkoInput): CandleList;
