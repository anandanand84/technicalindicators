import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class ADXInput extends IndicatorInput {
    high: number[];
    low: number[];
    close: number[];
    period: number;
}
export declare class ADXOutput extends IndicatorInput {
    adx: number;
    pdi: number;
    mdi: number;
}
export declare class ADX extends Indicator {
    result: ADXOutput[];
    generator: IterableIterator<ADXOutput | undefined>;
    constructor(input: ADXInput);
    static calculate: typeof adx;
    nextValue(price: number): ADXOutput | undefined;
}
export declare function adx(input: ADXInput): ADXOutput[];
