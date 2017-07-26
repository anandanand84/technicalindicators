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
    timestamp?: number;
    volume?: number;
}
export declare class CandleList {
    open?: number[];
    high?: number[];
    low?: number[];
    close?: number[];
    volume?: number[];
    timestamp?: number[];
}
