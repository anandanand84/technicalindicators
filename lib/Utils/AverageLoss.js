import { Indicator, IndicatorInput } from '../indicator/indicator';
export class AvgLossInput extends IndicatorInput {
}
export class AverageLoss extends Indicator {
    constructor(input) {
        super(input);
        let values = input.values;
        let period = input.period;
        let format = this.format;
        this.generator = (function* (period) {
            var currentValue = yield;
            var counter = 1;
            var lossSum = 0;
            var avgLoss;
            var loss;
            var lastValue;
            while (true) {
                loss = lastValue ? (lastValue - currentValue) : 0;
                loss = loss ? loss : 0;
                if (loss > 0) {
                    lossSum = lossSum + loss;
                }
                if (counter < (period + 1)) {
                    counter++;
                }
                else if (!avgLoss) {
                    avgLoss = lossSum / period;
                }
                else {
                    avgLoss = ((avgLoss * (period - 1)) + (loss > 0 ? loss : 0)) / period;
                }
                lastValue = currentValue;
                avgLoss = avgLoss ? format(avgLoss) : undefined;
                currentValue = yield avgLoss;
            }
        })(period);
        this.generator.next();
        this.result = [];
        values.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
AverageLoss.calculate = averageloss;
export function averageloss(input) {
    Indicator.reverseInputs(input);
    var result = new AverageLoss(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
//# sourceMappingURL=AverageLoss.js.map