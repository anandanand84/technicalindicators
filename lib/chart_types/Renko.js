import { CandleList } from '../StockData';
import { atr } from '../directionalmovement/ATR';
/**
 * Created by AAravindan on 5/4/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';
export class RenkoInput extends IndicatorInput {
}
class Renko extends Indicator {
    constructor(input) {
        super(input);
        var format = this.format;
        let useATR = input.useATR;
        let brickSize = input.brickSize || 0;
        if (useATR) {
            let atrResult = atr(Object.assign({}, input));
            brickSize = atrResult[atrResult.length - 1];
        }
        this.result = new CandleList();
        ;
        if (brickSize === 0) {
            console.error('Not enough data to calculate brickSize for renko when using ATR');
            return;
        }
        let lastOpen = 0;
        let lastHigh = 0;
        let lastLow = Infinity;
        let lastClose = 0;
        let lastVolume = 0;
        let lastTimestamp = 0;
        this.generator = (function* () {
            let candleData = yield;
            while (true) {
                //Calculating first bar
                if (lastOpen === 0) {
                    lastOpen = candleData.close;
                    lastHigh = candleData.high;
                    lastLow = candleData.low;
                    lastClose = candleData.close;
                    lastVolume = candleData.volume;
                    lastTimestamp = candleData.timestamp;
                    candleData = yield;
                    continue;
                }
                let absoluteMovementFromClose = Math.abs(candleData.close - lastClose);
                let absoluteMovementFromOpen = Math.abs(candleData.close - lastOpen);
                if ((absoluteMovementFromClose >= brickSize) && (absoluteMovementFromOpen >= brickSize)) {
                    let reference = absoluteMovementFromClose > absoluteMovementFromOpen ? lastOpen : lastClose;
                    let calculated = {
                        open: reference,
                        high: lastHigh > candleData.high ? lastHigh : candleData.high,
                        low: lastLow < candleData.Low ? lastLow : candleData.low,
                        close: reference > candleData.close ? (reference - brickSize) : (reference + brickSize),
                        volume: lastVolume + candleData.volume,
                        timestamp: candleData.timestamp
                    };
                    lastOpen = calculated.open;
                    lastHigh = calculated.close;
                    lastLow = calculated.close;
                    lastClose = calculated.close;
                    lastVolume = 0;
                    candleData = yield calculated;
                }
                else {
                    lastHigh = lastHigh > candleData.high ? lastHigh : candleData.high;
                    lastLow = lastLow < candleData.Low ? lastLow : candleData.low;
                    lastVolume = lastVolume + candleData.volume;
                    lastTimestamp = candleData.timestamp;
                    candleData = yield;
                }
            }
        })();
        this.generator.next();
        input.low.forEach((tick, index) => {
            var result = this.generator.next({
                open: input.open[index],
                high: input.high[index],
                low: input.low[index],
                close: input.close[index],
                volume: input.volume[index],
                timestamp: input.timestamp[index]
            });
            if (result.value) {
                this.result.open.push(result.value.open);
                this.result.high.push(result.value.high);
                this.result.low.push(result.value.low);
                this.result.close.push(result.value.close);
                this.result.volume.push(result.value.volume);
                this.result.timestamp.push(result.value.timestamp);
            }
        });
    }
    nextValue(price) {
        console.error('Cannot calculate next value on Renko, Every value has to be recomputed for every change, use calcualte method');
        return null;
    }
    ;
}
Renko.calculate = renko;
export function renko(input) {
    Indicator.reverseInputs(input);
    var result = new Renko(input).result;
    if (input.reversedInput) {
        result.open.reverse();
        result.high.reverse();
        result.low.reverse();
        result.close.reverse();
        result.volume.reverse();
        result.timestamp.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
