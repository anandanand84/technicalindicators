export default class StockData {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    reversedInput?: boolean;
    constructor(open: number[], high: number[], low: number[], close: number[], reversedInput: boolean);
}
export declare class CandleData {
    open?: number;
    high?: number;
    low?: number;
    close?: number;
}
