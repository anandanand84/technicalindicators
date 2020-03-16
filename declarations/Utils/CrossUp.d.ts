import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class CrossInput extends IndicatorInput {
    lineA: number[];
    lineB: number[];
    constructor(lineA: number[], lineB: number[]);
}
export declare class CrossUp extends Indicator {
    lineA: number[];
    lineB: number[];
    result: boolean[];
    generator: IterableIterator<true | false>;
    constructor(input: CrossInput);
    static calculate: typeof crossUp;
    static reverseInputs(input: CrossInput): void;
    nextValue(valueA: number, valueB: number): true | false;
}
export declare function crossUp(input: CrossInput): boolean[];
