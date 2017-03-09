import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class KSTInput extends IndicatorInput {
    ROCPer1: number;
    ROCPer2: number;
    ROCPer3: number;
    ROCPer4: number;
    SMAROCPer1: number;
    SMAROCPer2: number;
    SMAROCPer3: number;
    SMAROCPer4: number;
    signalPeriod: number;
    values: number[];
}
export declare class KSTOutput {
    kst: number;
    signal: number;
}
export declare class KST extends Indicator {
    result: KSTOutput[];
    generator: IterableIterator<KSTOutput | undefined>;
    constructor(input: KSTInput);
    static calculate: typeof kst;
    nextValue(price: number): KSTOutput;
}
export declare function kst(input: KSTInput): KSTOutput[];
