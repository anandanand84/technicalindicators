import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class CrossInput extends IndicatorInput {
    lineA: number[];
    lineB: number[];
    constructor(lineA: number[], lineB: number[]);
}
export declare class CrossDown extends Indicator {
    lineA: number[];
    lineB: number[];
    result: boolean[];
    generator: IterableIterator<true | false>;
    constructor(input: CrossInput);
    static calculate: typeof crossDown;
    static reverseInputs(input: CrossInput): void;
    nextValue(valueA: number, valueB: number): true | false;
}
export declare function crossDown(input: CrossInput): boolean[];
