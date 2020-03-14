import {Indicator, IndicatorInput} from '../indicator/indicator';

export class CrossInput extends IndicatorInput {
    constructor(public lineA: number[], public lineB: number[]) {
        super();
    }
}

export class CrossDown extends Indicator {
    lineA: number[];
    lineB: number[];
    result: boolean[];
    generator: IterableIterator<true | false>;

    constructor(input: CrossInput) {
        super(input);

        this.lineA = input.lineA;
        this.lineB = input.lineB;

        var currentLineA = [];
        var currentLineB = [];

        const genFn = (function* (): IterableIterator<true | false> {
            var current = yield;
            var result = false;

            while (true) {
                currentLineA.unshift(current.valueA);
                currentLineB.unshift(current.valueB);

                result = current.valueA < current.valueB;

                var pointer = 1;
                while (result === true && currentLineA[pointer] <= currentLineB[pointer]) {
                    if (currentLineA[pointer] < currentLineB[pointer]) {
                        result = false;
                    } else if (currentLineA[pointer] > currentLineB[pointer]) {
                        result = true;
                    } else if (currentLineA[pointer] === currentLineB[pointer]) {
                        pointer += 1;
                    }
                }

                if (result === true) {
                    currentLineA = [current.valueA];
                    currentLineB = [current.valueB];
                }

                current = yield result;
            }
        });

        this.generator = genFn();
        this.generator.next();

        this.result = [];
        this.lineA.forEach((value, index) => {
            var result = this.generator.next({
                valueA: this.lineA[index],
                valueB: this.lineB[index]
            });

            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }

    static calculate = crossDown;

    static reverseInputs(input: CrossInput): void {
        if (input.reversedInput) {
            input.lineA ? input.lineA.reverse() : undefined;
            input.lineB ? input.lineB.reverse() : undefined;
        }
    }

    nextValue(valueA: number, valueB: number): true | false {
        return this.generator.next({
            valueA: valueA,
            valueB: valueB
        }).value;
    };
}

export function crossDown(input: CrossInput): boolean[] {
    Indicator.reverseInputs(input);
    var result = new CrossDown(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
