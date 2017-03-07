"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const SMA_1 = require("./SMA");
const EMA_1 = require("./EMA");
class MACDInput extends indicator_1.IndicatorInput {
    constructor(period, values) {
        super();
        this.period = period;
        this.values = values;
        this.SimpleMAOscillator = true;
        this.SimpleMASignal = true;
    }
}
exports.MACDInput = MACDInput;
class MACDOutput {
}
exports.MACDOutput = MACDOutput;
class MACD extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var oscillatorMAtype = input.SimpleMAOscillator ? SMA_1.SMA : EMA_1.EMA;
        var signalMAtype = input.SimpleMASignal ? SMA_1.SMA : EMA_1.EMA;
        var fastMAProducer = new oscillatorMAtype({ period: input.fastPeriod, values: [], format: (v) => { return v; } });
        var slowMAProducer = new oscillatorMAtype({ period: input.slowPeriod, values: [], format: (v) => { return v; } });
        var signalMAProducer = new signalMAtype({ period: input.signalPeriod, values: [], format: (v) => { return v; } });
        var format = this.format;
        this.result = [];
        this.generator = (function* () {
            var index = 0;
            var tick;
            var MACD, signal, histogram, fast, slow;
            while (true) {
                if (index < input.slowPeriod) {
                    tick = yield;
                    fast = fastMAProducer.nextValue(tick);
                    slow = slowMAProducer.nextValue(tick);
                    index++;
                    continue;
                }
                if (fast && slow) {
                    MACD = fast - slow;
                    signal = signalMAProducer.nextValue(MACD);
                }
                histogram = MACD - signal;
                tick = yield ({
                    MACD: format(MACD),
                    signal: signal ? format(signal) : undefined,
                    histogram: isNaN(histogram) ? undefined : format(histogram)
                });
                fast = fastMAProducer.nextValue(tick);
                slow = slowMAProducer.nextValue(tick);
            }
        })();
        this.generator.next();
        input.values.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value) {
                this.result.push(result.value);
            }
        });
    }
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new MACD(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        indicator_1.Indicator.reverseInputs(input);
        return result;
    }
    ;
    nextValue(price) {
        var result = this.generator.next(price).value;
        return result;
    }
    ;
}
exports.MACD = MACD;
