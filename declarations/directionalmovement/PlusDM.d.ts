import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class PDMInput extends IndicatorInput {
    low: number[];
    high: number[];
}
export declare class PDM extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: PDMInput);
    static calculate(input: PDMInput): number[];
    nextValue(price: number): number | undefined;
}
