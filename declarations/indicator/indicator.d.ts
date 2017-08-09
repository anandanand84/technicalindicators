export declare class IndicatorInput {
    reversedInput?: boolean;
    format?: (data: number) => number;
}
export declare class AllInputs {
    values?: number[];
    open?: number[];
    high?: number[];
    low?: number[];
    close?: number[];
    volume?: number[];
    timestamp?: number[];
}
export declare class Indicator {
    result: any;
    format: (data: number) => number;
    constructor(input: IndicatorInput);
    static reverseInputs(input: any): void;
    getResult(): any;
}
