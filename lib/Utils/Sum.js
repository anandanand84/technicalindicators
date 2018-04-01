import { Indicator, IndicatorInput } from '../indicator/indicator';
import FixedSizedLinkedList from './FixedSizeLinkedList';
export class SumInput extends IndicatorInput {
}
export class Sum extends Indicator {
    constructor(input) {
        super(input);
        var values = input.values;
        var period = input.period;
        this.result = [];
        var periodList = new FixedSizedLinkedList(period, false, false, true);
        this.generator = (function* () {
            var result;
            var tick;
            var high;
            tick = yield;
            while (true) {
                periodList.push(tick);
                if (periodList.totalPushed >= period) {
                    high = periodList.periodSum;
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
Sum.calculate = sum;
export function sum(input) {
    Indicator.reverseInputs(input);
    var result = new Sum(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
