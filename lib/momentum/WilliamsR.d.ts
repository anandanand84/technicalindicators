import { IndicatorInput, Indicator } from '../indicator/indicator';
export declare class WilliamsRInput extends IndicatorInput {
    low: number[];
    high: number[];
    close: number[];
    period: number;
}
export declare class WilliamsR extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: WilliamsRInput);
    static calculate: typeof williamsr;
    nextValue(price: number): number | undefined;
}
export declare function williamsr(input: WilliamsRInput): number[];
