/**
 * Created by AAravindan on 5/17/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { TypicalPrice } from '../chart_types/TypicalPrice';
import FixedSizeLinkedList from '../Utils/FixedSizeLinkedList';
export class MFIInput extends IndicatorInput {
}
export class MFI extends Indicator {
    constructor(input) {
        super(input);
        var highs = input.high;
        var lows = input.low;
        var closes = input.close;
        var volumes = input.volume;
        var period = input.period;
        var typicalPrice = new TypicalPrice({ low: [], high: [], close: [] });
        var positiveFlow = new FixedSizeLinkedList(period, false, false, true);
        var negativeFlow = new FixedSizeLinkedList(period, false, false, true);
        if (!((lows.length === highs.length) && (highs.length === closes.length) && (highs.length === volumes.length))) {
            throw ('Inputs(low,high, close, volumes) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var result;
            var tick;
            var lastClose;
            var positiveFlowForPeriod;
            var rawMoneyFlow = 0;
            var moneyFlowRatio;
            var negativeFlowForPeriod;
            let typicalPriceValue = null;
            let prevousTypicalPrice = null;
            tick = yield;
            lastClose = tick.close; //Fist value 
            tick = yield;
            while (true) {
                var { high, low, close, volume } = tick;
                var positionMoney = 0;
                var negativeMoney = 0;
                typicalPriceValue = typicalPrice.nextValue({ high, low, close });
                rawMoneyFlow = typicalPriceValue * volume;
                if ((typicalPriceValue != null) && (prevousTypicalPrice != null)) {
                    typicalPriceValue > prevousTypicalPrice ? positionMoney = rawMoneyFlow : negativeMoney = rawMoneyFlow;
                    positiveFlow.push(positionMoney);
                    negativeFlow.push(negativeMoney);
                    positiveFlowForPeriod = positiveFlow.periodSum;
                    negativeFlowForPeriod = negativeFlow.periodSum;
                    if ((positiveFlow.totalPushed >= period) && (positiveFlow.totalPushed >= period)) {
                        moneyFlowRatio = positiveFlowForPeriod / negativeFlowForPeriod;
                        result = 100 - 100 / (1 + moneyFlowRatio);
                    }
                }
                prevousTypicalPrice = typicalPriceValue;
                tick = yield result;
            }
        })();
        this.generator.next();
        highs.forEach((tickHigh, index) => {
            var tickInput = {
                high: tickHigh,
                low: lows[index],
                close: closes[index],
                volume: volumes[index]
            };
            var result = this.generator.next(tickInput);
            if (result.value != undefined) {
                this.result.push(parseFloat(result.value.toFixed(2)));
            }
        });
    }
    ;
    nextValue(price) {
        var result = this.generator.next(price);
        if (result.value != undefined) {
            return (parseFloat(result.value.toFixed(2)));
        }
    }
    ;
}
MFI.calculate = mfi;
export function mfi(input) {
    Indicator.reverseInputs(input);
    var result = new MFI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
