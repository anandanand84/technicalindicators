import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class TRIXInput extends IndicatorInput {
    values: number[];
    period: number;
}
export declare class TRIX extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: TRIXInput);
    static calculate: typeof trix;
    nextValue(price: number): number;
}
export declare function trix(input: TRIXInput): number[];
