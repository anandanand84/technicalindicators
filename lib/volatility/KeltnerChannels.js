import { Indicator, IndicatorInput } from '../indicator/indicator';
import { SMA } from '../moving_averages/SMA';
import { EMA } from '../moving_averages/EMA';
import { ATR } from '../directionalmovement/ATR';
export class KeltnerChannelsInput extends IndicatorInput {
    constructor() {
        super(...arguments);
        this.maPeriod = 20;
        this.atrPeriod = 10;
        this.useSMA = false;
        this.multiplier = 1;
    }
}
export class KeltnerChannelsOutput extends IndicatorInput {
}
;
export class KeltnerChannels extends Indicator {
    constructor(input) {
        super(input);
        var maType = input.useSMA ? SMA : EMA;
        var maProducer = new maType({ period: input.maPeriod, values: [], format: (v) => { return v; } });
        var atrProducer = new ATR({ period: input.atrPeriod, high: [], low: [], close: [], format: (v) => { return v; } });
        var tick;
        this.result = [];
        this.generator = (function* () {
            var KeltnerChannelsOutput;
            var result;
            tick = yield;
            while (true) {
                var { close } = tick;
                var ma = maProducer.nextValue(close);
                var atr = atrProducer.nextValue(tick);
                if (ma != undefined && atr != undefined) {
                    result = {
                        middle: ma,
                        upper: ma + (input.multiplier * (atr)),
                        lower: ma - (input.multiplier * (atr))
                    };
                }
                tick = yield result;
            }
        })();
        this.generator.next();
        var highs = input.high;
        highs.forEach((tickHigh, index) => {
            var tickInput = {
                high: tickHigh,
                low: input.low[index],
                close: input.close[index],
            };
            var result = this.generator.next(tickInput);
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
KeltnerChannels.calculate = keltnerchannels;
export function keltnerchannels(input) {
    Indicator.reverseInputs(input);
    var result = new KeltnerChannels(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
