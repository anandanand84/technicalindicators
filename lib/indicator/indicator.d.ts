export declare class IndicatorInput {
    reversedInput?: boolean;
    values?: number[];
    open?: number[];
    high?: number[];
    low?: number[];
    close?: number[];
    volume?: number[];
    format?: (data: number) => number;
}
export declare class Indicator {
    result: any[];
    format: (data: number) => number;
    constructor(input: IndicatorInput);
    static reverseInputs(input: IndicatorInput): void;
    getResult(): any[];
}
