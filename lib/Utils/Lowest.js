import { Indicator, IndicatorInput } from '../indicator/indicator';
import FixedSizedLinkedList from './FixedSizeLinkedList';
export class LowestInput extends IndicatorInput {
}
export class Lowest extends Indicator {
    constructor(input) {
        super(input);
        var values = input.values;
        var period = input.period;
        this.result = [];
        var periodList = new FixedSizedLinkedList(period, false, true, false);
        this.generator = (function* () {
            var result;
            var tick;
            var high;
            tick = yield;
            while (true) {
                periodList.push(tick);
                if (periodList.totalPushed >= period) {
                    high = periodList.periodLow;
                }
                tick = yield high;
            }
        })();
        this.generator.next();
        values.forEach((value, index) => {
            var result = this.generator.next(value);
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    nextValue(price) {
        var result = this.generator.next(price);
        if (result.value != undefined) {
            return result.value;
        }
    }
    ;
}
Lowest.calculate = lowest;
export function lowest(input) {
    Indicator.reverseInputs(input);
    var result = new Lowest(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
