import { IndicatorInput, Indicator } from '../indicator/indicator';
export declare class PSARInput extends IndicatorInput {
    step: number;
    max: number;
    high: number[];
    low: number[];
}
export declare class PSAR extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: PSARInput);
    static calculate: typeof psar;
    nextValue(input: PSARInput): number;
}
export declare function psar(input: PSARInput): number[];
