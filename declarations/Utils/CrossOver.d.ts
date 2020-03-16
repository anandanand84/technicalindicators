import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class CrossInput extends IndicatorInput {
    lineA: number[];
    lineB: number[];
    constructor(lineA: number[], lineB: number[]);
}
export declare class CrossOver extends Indicator {
    generator: IterableIterator<true | false>;
    result: boolean[];
    constructor(input: CrossInput);
    static calculate: typeof crossOver;
    static reverseInputs(input: CrossInput): void;
    nextValue(valueA: number, valueB: number): true | false;
}
export declare function crossOver(input: CrossInput): boolean[];
