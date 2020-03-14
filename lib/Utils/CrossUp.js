import { Indicator, IndicatorInput } from '../indicator/indicator';
export class CrossInput extends IndicatorInput {
    constructor(lineA, lineB) {
        super();
        this.lineA = lineA;
        this.lineB = lineB;
    }
}
export class CrossUp extends Indicator {
    constructor(input) {
        super(input);
        this.lineA = input.lineA;
        this.lineB = input.lineB;
        var currentLineA = [];
        var currentLineB = [];
        const genFn = (function* () {
            var current = yield;
            var result = false;
            while (true) {
                currentLineA.unshift(current.valueA);
                currentLineB.unshift(current.valueB);
                result = current.valueA > current.valueB;
                var pointer = 1;
                while (result === true && currentLineA[pointer] >= currentLineB[pointer]) {
                    if (currentLineA[pointer] > currentLineB[pointer]) {
                        result = false;
                    }
                    else if (currentLineA[pointer] < currentLineB[pointer]) {
                        result = true;
                    }
                    else if (currentLineA[pointer] === currentLineB[pointer]) {
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
    static reverseInputs(input) {
        if (input.reversedInput) {
            input.lineA ? input.lineA.reverse() : undefined;
            input.lineB ? input.lineB.reverse() : undefined;
        }
    }
    nextValue(valueA, valueB) {
        return this.generator.next({
            valueA: valueA,
            valueB: valueB
        }).value;
    }
    ;
}
CrossUp.calculate = crossUp;
export function crossUp(input) {
    Indicator.reverseInputs(input);
    var result = new CrossUp(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
