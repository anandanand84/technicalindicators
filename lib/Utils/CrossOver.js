import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CrossUp } from './CrossUp';
import { CrossDown } from './CrossDown';
export class CrossInput extends IndicatorInput {
    constructor(lineA, lineB) {
        super();
        this.lineA = lineA;
        this.lineB = lineB;
    }
}
export class CrossOver extends Indicator {
    constructor(input) {
        super(input);
        var crossUp = new CrossUp({ lineA: input.lineA, lineB: input.lineB });
        var crossDown = new CrossDown({ lineA: input.lineA, lineB: input.lineB });
        const genFn = (function* () {
            var current = yield;
            var result = false;
            var first = true;
            while (true) {
                var nextUp = crossUp.nextValue(current.valueA, current.valueB);
                var nextDown = crossDown.nextValue(current.valueA, current.valueB);
                result = nextUp || nextDown;
                if (first)
                    result = false;
                first = false;
                current = yield result;
            }
        });
        this.generator = genFn();
        this.generator.next();
        var resultA = crossUp.getResult();
        var resultB = crossDown.getResult();
        this.result = resultA.map((a, index) => {
            if (index === 0)
                return false;
            return !!(a || resultB[index]);
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
CrossOver.calculate = crossOver;
export function crossOver(input) {
    Indicator.reverseInputs(input);
    var result = new CrossOver(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
