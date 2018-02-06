/**
 * Created by AAravindan on 5/4/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class MACDInput extends IndicatorInput {
    values: number[];
    SimpleMAOscillator: boolean;
    SimpleMASignal: boolean;
    fastPeriod: number;
    slowPeriod: number;
    signalPeriod: number;
    constructor(values: number[]);
}
export declare class MACDOutput {
    MACD?: number;
    signal?: number;
    histogram?: number;
}
export declare class MACD extends Indicator {
    result: MACDOutput[];
    generator: IterableIterator<MACDOutput | undefined>;
    constructor(input: MACDInput);
    static calculate: typeof macd;
    nextValue(price: number): MACDOutput | undefined;
}
export declare function macd(input: MACDInput): MACDOutput[];
