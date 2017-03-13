import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class MDMInput extends IndicatorInput {
    low: number[];
    high: number[];
}
export declare class MDM extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: MDMInput);
    static calculate(input: MDMInput): number[];
    nextValue(price: number): number | undefined;
}
