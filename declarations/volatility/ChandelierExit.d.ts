import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class ChandelierExitInput extends IndicatorInput {
    period: number;
    multiplier: number;
    high: number[];
    low: number[];
    close: number[];
}
export declare class ChandelierExitOutput extends IndicatorInput {
    exitLong: number;
    exitShort: number;
}
export declare class ChandelierExit extends Indicator {
    generator: IterableIterator<ChandelierExitOutput | undefined>;
    constructor(input: ChandelierExitInput);
    static calculate: typeof chandelierexit;
    nextValue(price: ChandelierExitInput): ChandelierExitOutput | undefined;
}
export declare function chandelierexit(input: ChandelierExitInput): number[];
