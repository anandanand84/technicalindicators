/**
 * Created by AAravindan on 5/5/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { AverageGain } from '../Utils/AverageGain';
import { AverageLoss } from '../Utils/AverageLoss';
export class RSIInput extends IndicatorInput {
}
export class RSI extends Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var values = input.values;
        var GainProvider = new AverageGain({ period: period, values: [] });
        var LossProvider = new AverageLoss({ period: period, values: [] });
        this.generator = (function* (period) {
            var current = yield;
            var lastAvgGain, lastAvgLoss, RS, currentRSI;
            while (true) {
                lastAvgGain = GainProvider.nextValue(current);
                lastAvgLoss = LossProvider.nextValue(current);
                if (lastAvgGain && lastAvgLoss) {
                    if (lastAvgLoss === 0) {
                        currentRSI = 100;
                    }
                    else {
                        RS = lastAvgGain / lastAvgLoss;
                        currentRSI = parseFloat((100 - (100 / (1 + RS))).toFixed(2));
                    }
                }
                else if (lastAvgGain && !lastAvgLoss) {
                    currentRSI = 100;
                }
                else if (lastAvgLoss && !lastAvgGain) {
                    currentRSI = 0;
                }
                current = yield currentRSI;
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
    ;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
RSI.calculate = rsi;
export function rsi(input) {
    Indicator.reverseInputs(input);
    var result = new RSI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
//# sourceMappingURL=RSI.js.map