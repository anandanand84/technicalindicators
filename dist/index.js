/* APP */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var KerasJS = _interopDefault(require('keras-js'));

class CandleData {
}
class CandleList {
    constructor() {
        this.open = [];
        this.high = [];
        this.low = [];
        this.close = [];
        this.volume = [];
        this.timestamp = [];
    }
}

let config = {};
function setConfig(key, value) {
    config[key] = value;
}
function getConfig(key) {
    return config[key];
}

function format(v) {
    let precision = getConfig('precision');
    if (precision) {
        return parseFloat(v.toPrecision(precision));
    }
    return v;
}

class IndicatorInput {
}

class Indicator {
    constructor(input) {
        this.format = input.format || format;
    }
    static reverseInputs(input) {
        if (input.reversedInput) {
            input.values ? input.values.reverse() : undefined;
            input.open ? input.open.reverse() : undefined;
            input.high ? input.high.reverse() : undefined;
            input.low ? input.low.reverse() : undefined;
            input.close ? input.close.reverse() : undefined;
            input.volume ? input.volume.reverse() : undefined;
            input.timestamp ? input.timestamp.reverse() : undefined;
        }
    }
    getResult() {
        return this.result;
    }
}

class Item {
    constructor(data, prev, next) {
        this.next = next;
        if (next)
            next.prev = this;
        this.prev = prev;
        if (prev)
            prev.next = this;
        this.data = data;
    }
}
class LinkedList {
    constructor() {
        this._length = 0;
    }
    get head() {
        return this._head && this._head.data;
    }
    get tail() {
        return this._tail && this._tail.data;
    }
    get current() {
        return this._current && this._current.data;
    }
    get length() {
        return this._length;
    }
    push(data) {
        this._tail = new Item(data, this._tail);
        if (this._length === 0) {
            this._head = this._tail;
            this._current = this._head;
            this._next = this._head;
        }
        this._length++;
    }
    pop() {
        var tail = this._tail;
        if (this._length === 0) {
            return;
        }
        this._length--;
        if (this._length === 0) {
            this._head = this._tail = this._current = this._next = undefined;
            return tail.data;
        }
        this._tail = tail.prev;
        this._tail.next = undefined;
        if (this._current === tail) {
            this._current = this._tail;
            this._next = undefined;
        }
        return tail.data;
    }
    shift() {
        var head = this._head;
        if (this._length === 0) {
            return;
        }
        this._length--;
        if (this._length === 0) {
            this._head = this._tail = this._current = this._next = undefined;
            return head.data;
        }
        this._head = this._head.next;
        if (this._current === head) {
            this._current = this._head;
            this._next = this._current.next;
        }
        return head.data;
    }
    unshift(data) {
        this._head = new Item(data, undefined, this._head);
        if (this._length === 0) {
            this._tail = this._head;
            this._next = this._head;
        }
        this._length++;
    }
    unshiftCurrent() {
        var current = this._current;
        if (current === this._head || this._length < 2) {
            return current && current.data;
        }
        // remove
        if (current === this._tail) {
            this._tail = current.prev;
            this._tail.next = undefined;
            this._current = this._tail;
        }
        else {
            current.next.prev = current.prev;
            current.prev.next = current.next;
            this._current = current.prev;
        }
        this._next = this._current.next;
        // unshift
        current.next = this._head;
        current.prev = undefined;
        this._head.prev = current;
        this._head = current;
        return current.data;
    }
    removeCurrent() {
        var current = this._current;
        if (this._length === 0) {
            return;
        }
        this._length--;
        if (this._length === 0) {
            this._head = this._tail = this._current = this._next = undefined;
            return current.data;
        }
        if (current === this._tail) {
            this._tail = current.prev;
            this._tail.next = undefined;
            this._current = this._tail;
        }
        else if (current === this._head) {
            this._head = current.next;
            this._head.prev = undefined;
            this._current = this._head;
        }
        else {
            current.next.prev = current.prev;
            current.prev.next = current.next;
            this._current = current.prev;
        }
        this._next = this._current.next;
        return current.data;
    }
    resetCursor() {
        this._current = this._next = this._head;
        return this;
    }
    next() {
        var next = this._next;
        if (next !== undefined) {
            this._next = next.next;
            this._current = next;
            return next.data;
        }
    }
}

//STEP 2. Create the input for the indicator, mandatory should be in the constructor

//STEP3. Add class based syntax with export
class SMA extends Indicator {
    constructor(input) {
        super(input);
        this.period = input.period;
        this.price = input.values;
        var genFn = (function* (period) {
            var list = new LinkedList();
            var sum = 0;
            var counter = 1;
            var current = yield;
            var result;
            list.push(0);
            while (true) {
                if (counter < period) {
                    counter++;
                    list.push(current);
                    sum = sum + current;
                }
                else {
                    sum = sum - list.shift() + current;
                    result = ((sum) / period);
                    list.push(current);
                }
                current = yield result;
            }
        });
        this.generator = genFn(this.period);
        this.generator.next();
        this.result = [];
        this.price.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    nextValue(price) {
        var result = this.generator.next(price).value;
        if (result != undefined)
            return this.format(result);
    }
    ;
}
SMA.calculate = sma;
function sma(input) {
    Indicator.reverseInputs(input);
    var result = new SMA(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

//STEP 6. Run the tests

class EMA extends Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        var exponent = (2 / (period + 1));
        var sma$$1;
        this.result = [];
        sma$$1 = new SMA({ period: period, values: [] });
        var genFn = (function* () {
            var tick = yield;
            var prevEma;
            while (true) {
                if (prevEma !== undefined && tick !== undefined) {
                    prevEma = ((tick - prevEma) * exponent) + prevEma;
                    tick = yield prevEma;
                }
                else {
                    tick = yield;
                    prevEma = sma$$1.nextValue(tick);
                    if (prevEma)
                        tick = yield prevEma;
                }
            }
        });
        this.generator = genFn();
        this.generator.next();
        this.generator.next();
        priceArray.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value != undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    nextValue(price) {
        var result = this.generator.next(price).value;
        if (result != undefined)
            return this.format(result);
    }
    ;
}
EMA.calculate = ema;
function ema(input) {
    Indicator.reverseInputs(input);
    var result = new EMA(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class WMA extends Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        this.result = [];
        this.generator = (function* () {
            let data = new LinkedList();
            let denominator = period * (period + 1) / 2;
            while (true) {
                if ((data.length) < period) {
                    data.push(yield);
                }
                else {
                    data.resetCursor();
                    let result = 0;
                    for (let i = 1; i <= period; i++) {
                        result = result + (data.next() * i / (denominator));
                    }
                    var next = yield result;
                    data.shift();
                    data.push(next);
                }
            }
        })();
        this.generator.next();
        priceArray.forEach((tick, index) => {
            var result = this.generator.next(tick);
            if (result.value != undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    //STEP 5. REMOVE GET RESULT FUNCTION
    nextValue(price) {
        var result = this.generator.next(price).value;
        if (result != undefined)
            return this.format(result);
    }
    ;
}
WMA.calculate = wma;

function wma(input) {
    Indicator.reverseInputs(input);
    var result = new WMA(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class WEMA extends Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        var exponent = 1 / period;
        var sma$$1;
        this.result = [];
        sma$$1 = new SMA({ period: period, values: [] });
        var genFn = (function* () {
            var tick = yield;
            var prevEma;
            while (true) {
                if (prevEma !== undefined && tick !== undefined) {
                    prevEma = ((tick - prevEma) * exponent) + prevEma;
                    tick = yield prevEma;
                }
                else {
                    tick = yield;
                    prevEma = sma$$1.nextValue(tick);
                    if (prevEma !== undefined)
                        tick = yield prevEma;
                }
            }
        });
        this.generator = genFn();
        this.generator.next();
        this.generator.next();
        priceArray.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value != undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    nextValue(price) {
        var result = this.generator.next(price).value;
        if (result != undefined)
            return this.format(result);
    }
    ;
}
WEMA.calculate = wema;
function wema(input) {
    Indicator.reverseInputs(input);
    var result = new WEMA(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class MACD extends Indicator {
    constructor(input) {
        super(input);
        var oscillatorMAtype = input.SimpleMAOscillator ? SMA : EMA;
        var signalMAtype = input.SimpleMASignal ? SMA : EMA;
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
                    //fast : fast,
                    //slow : slow,
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
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    nextValue(price) {
        var result = this.generator.next(price).value;
        return result;
    }
    ;
}
MACD.calculate = macd;
function macd(input) {
    Indicator.reverseInputs(input);
    var result = new MACD(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class AverageGain extends Indicator {
    constructor(input) {
        super(input);
        let values = input.values;
        let period = input.period;
        let format = this.format;
        this.generator = (function* (period) {
            var currentValue = yield;
            var counter = 1;
            var gainSum = 0;
            var avgGain;
            var gain;
            var lastValue = currentValue;
            currentValue = yield;
            while (true) {
                gain = currentValue - lastValue;
                gain = gain > 0 ? gain : 0;
                if (gain > 0) {
                    gainSum = gainSum + gain;
                }
                if (counter < period) {
                    counter++;
                }
                else if (avgGain === undefined) {
                    avgGain = gainSum / period;
                }
                else {
                    avgGain = ((avgGain * (period - 1)) + gain) / period;
                }
                lastValue = currentValue;
                avgGain = (avgGain !== undefined) ? format(avgGain) : undefined;
                currentValue = yield avgGain;
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
AverageGain.calculate = averagegain;
function averagegain(input) {
    Indicator.reverseInputs(input);
    var result = new AverageGain(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class AverageLoss extends Indicator {
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
            var lastValue = currentValue;
            currentValue = yield;
            while (true) {
                loss = lastValue - currentValue;
                loss = loss > 0 ? loss : 0;
                if (loss > 0) {
                    lossSum = lossSum + loss;
                }
                if (counter < period) {
                    counter++;
                }
                else if (avgLoss === undefined) {
                    avgLoss = lossSum / period;
                }
                else {
                    avgLoss = ((avgLoss * (period - 1)) + loss) / period;
                }
                lastValue = currentValue;
                avgLoss = (avgLoss !== undefined) ? format(avgLoss) : undefined;
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
function averageloss(input) {
    Indicator.reverseInputs(input);
    var result = new AverageLoss(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

/**
 * Created by AAravindan on 5/5/16.
 */

class RSI extends Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var values = input.values;
        var GainProvider = new AverageGain({ period: period, values: [] });
        var LossProvider = new AverageLoss({ period: period, values: [] });
        let count = 1;
        this.generator = (function* (period) {
            var current = yield;
            var lastAvgGain, lastAvgLoss, RS, currentRSI;
            while (true) {
                lastAvgGain = GainProvider.nextValue(current);
                lastAvgLoss = LossProvider.nextValue(current);
                if ((lastAvgGain !== undefined) && (lastAvgLoss !== undefined)) {
                    if (lastAvgLoss === 0) {
                        currentRSI = 100;
                    }
                    else if (lastAvgGain === 0) {
                        currentRSI = 0;
                    }
                    else {
                        RS = lastAvgGain / lastAvgLoss;
                        RS = isNaN(RS) ? 0 : RS;
                        currentRSI = parseFloat((100 - (100 / (1 + RS))).toFixed(2));
                    }
                }
                count++;
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
function rsi(input) {
    Indicator.reverseInputs(input);
    var result = new RSI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class FixedSizeLinkedList extends LinkedList {
    constructor(size, maintainHigh, maintainLow, maintainSum) {
        super();
        this.size = size;
        this.maintainHigh = maintainHigh;
        this.maintainLow = maintainLow;
        this.maintainSum = maintainSum;
        this.totalPushed = 0;
        this.periodHigh = 0;
        this.periodLow = Infinity;
        this.periodSum = 0;
        if (!size || typeof size !== 'number') {
            throw ('Size required and should be a number.');
        }
        this._push = this.push;
        this.push = function (data) {
            this.add(data);
            this.totalPushed++;
        };
    }
    add(data) {
        if (this.length === this.size) {
            this.lastShift = this.shift();
            this._push(data);
            //TODO: FInd a better way
            if (this.maintainHigh)
                if (this.lastShift == this.periodHigh)
                    this.calculatePeriodHigh();
            if (this.maintainLow)
                if (this.lastShift == this.periodLow)
                    this.calculatePeriodLow();
            if (this.maintainSum) {
                this.periodSum = this.periodSum - this.lastShift;
            }
        }
        else {
            this._push(data);
        }
        //TODO: FInd a better way
        if (this.maintainHigh)
            if (this.periodHigh <= data)
                (this.periodHigh = data);
        if (this.maintainLow)
            if (this.periodLow >= data)
                (this.periodLow = data);
        if (this.maintainSum) {
            this.periodSum = this.periodSum + data;
        }
    }
    *iterator() {
        this.resetCursor();
        while (this.next()) {
            yield this.current;
        }
    }
    calculatePeriodHigh() {
        this.resetCursor();
        if (this.next())
            this.periodHigh = this.current;
        while (this.next()) {
            if (this.periodHigh <= this.current) {
                this.periodHigh = this.current;
            }
            
        }
        
    }
    calculatePeriodLow() {
        this.resetCursor();
        if (this.next())
            this.periodLow = this.current;
        while (this.next()) {
            if (this.periodLow >= this.current) {
                this.periodLow = this.current;
            }
            
        }
        
    }
}

class SD extends Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        var sma$$1 = new SMA({ period: period, values: [], format: (v) => { return v; } });
        this.result = [];
        this.generator = (function* () {
            var tick;
            var mean;
            var currentSet = new FixedSizeLinkedList(period);
            
            tick = yield;
            var sd;
            while (true) {
                currentSet.push(tick);
                mean = sma$$1.nextValue(tick);
                if (mean) {
                    let sum = 0;
                    for (let x of currentSet.iterator()) {
                        sum = sum + (Math.pow((x - mean), 2));
                    }
                    sd = Math.sqrt(sum / (period));
                }
                tick = yield sd;
            }
        })();
        this.generator.next();
        priceArray.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value != undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    nextValue(price) {
        var nextResult = this.generator.next(price);
        if (nextResult.value != undefined)
            return this.format(nextResult.value);
    }
    ;
}
SD.calculate = sd;
function sd(input) {
    Indicator.reverseInputs(input);
    var result = new SD(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class BollingerBands extends Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        var stdDev = input.stdDev;
        var format = this.format;
        var sma$$1, sd$$1;
        this.result = [];
        sma$$1 = new SMA({ period: period, values: [], format: (v) => { return v; } });
        sd$$1 = new SD({ period: period, values: [], format: (v) => { return v; } });
        this.generator = (function* () {
            var result;
            var tick;
            var calcSMA;
            var calcsd;
            tick = yield;
            while (true) {
                calcSMA = sma$$1.nextValue(tick);
                calcsd = sd$$1.nextValue(tick);
                if (calcSMA) {
                    let middle = format(calcSMA);
                    let upper = format(calcSMA + (calcsd * stdDev));
                    let lower = format(calcSMA - (calcsd * stdDev));
                    let pb = format((tick - lower) / (upper - lower));
                    result = {
                        middle: middle,
                        upper: upper,
                        lower: lower,
                        pb: pb
                    };
                }
                tick = yield result;
            }
        })();
        this.generator.next();
        priceArray.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
BollingerBands.calculate = bollingerbands;
function bollingerbands(input) {
    Indicator.reverseInputs(input);
    var result = new BollingerBands(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

//STEP3. Add class based syntax with export
class WilderSmoothing extends Indicator {
    constructor(input) {
        super(input);
        this.period = input.period;
        this.price = input.values;
        var genFn = (function* (period) {
            var list = new LinkedList();
            var sum = 0;
            var counter = 1;
            var current = yield;
            var result = 0;
            while (true) {
                if (counter < period) {
                    counter++;
                    sum = sum + current;
                    result = undefined;
                }
                else if (counter == period) {
                    counter++;
                    sum = sum + current;
                    result = sum;
                }
                else {
                    result = result - (result / period) + current;
                }
                current = yield result;
            }
        });
        this.generator = genFn(this.period);
        this.generator.next();
        this.result = [];
        this.price.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value != undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    nextValue(price) {
        var result = this.generator.next(price).value;
        if (result != undefined)
            return this.format(result);
    }
    ;
}
WilderSmoothing.calculate = wildersmoothing;
function wildersmoothing(input) {
    Indicator.reverseInputs(input);
    var result = new WilderSmoothing(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

//STEP 6. Run the tests

class MDM extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var format = this.format;
        if (lows.length != highs.length) {
            throw ('Inputs(low,high) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var minusDm;
            var current = yield;
            var last;
            while (true) {
                if (last) {
                    let upMove = (current.high - last.high);
                    let downMove = (last.low - current.low);
                    minusDm = format((downMove > upMove && downMove > 0) ? downMove : 0);
                }
                last = current;
                current = yield minusDm;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index]
            });
            if (result.value !== undefined)
                this.result.push(result.value);
        });
    }
    ;
    static calculate(input) {
        Indicator.reverseInputs(input);
        var result = new MDM(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    }
    ;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}

/**
 * Created by AAravindan on 5/8/16.
 */


class PDM extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var format = this.format;
        if (lows.length != highs.length) {
            throw ('Inputs(low,high) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var plusDm;
            var current = yield;
            var last;
            while (true) {
                if (last) {
                    let upMove = (current.high - last.high);
                    let downMove = (last.low - current.low);
                    plusDm = format((upMove > downMove && upMove > 0) ? upMove : 0);
                }
                last = current;
                current = yield plusDm;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index]
            });
            if (result.value !== undefined)
                this.result.push(result.value);
        });
    }
    ;
    static calculate(input) {
        Indicator.reverseInputs(input);
        var result = new PDM(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    }
    ;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}

class TrueRange extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var format = this.format;
        if (lows.length != highs.length) {
            throw ('Inputs(low,high) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var current = yield;
            var previousClose, result;
            while (true) {
                if (previousClose === undefined) {
                    previousClose = current.close;
                    current = yield result;
                }
                result = Math.max(current.high - current.low, isNaN(Math.abs(current.high - previousClose)) ? 0 : Math.abs(current.high - previousClose), isNaN(Math.abs(current.low - previousClose)) ? 0 : Math.abs(current.low - previousClose));
                previousClose = current.close;
                if (result != undefined) {
                    result = format(result);
                }
                current = yield result;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value != undefined) {
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
TrueRange.calculate = truerange;
function truerange(input) {
    Indicator.reverseInputs(input);
    var result = new TrueRange(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class ADXOutput extends IndicatorInput {
}

class ADX extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var period = input.period;
        var format = this.format;
        var plusDM = new PDM({
            high: [],
            low: []
        });
        var minusDM = new MDM({
            high: [],
            low: []
        });
        var emaPDM = new WilderSmoothing({ period: period, values: [], format: (v) => { return v; } });
        var emaMDM = new WilderSmoothing({ period: period, values: [], format: (v) => { return v; } });
        var emaTR = new WilderSmoothing({ period: period, values: [], format: (v) => { return v; } });
        var emaDX = new WEMA({ period: period, values: [], format: (v) => { return v; } });
        var tr = new TrueRange({
            low: [],
            high: [],
            close: [],
        });
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        ADXOutput;
        this.generator = (function* () {
            var tick = yield;
            var index = 0;
            var lastATR, lastAPDM, lastAMDM, lastPDI, lastMDI, lastDX, smoothedDX;
            lastATR = 0;
            lastAPDM = 0;
            lastAMDM = 0;
            while (true) {
                let calcTr = tr.nextValue(tick);
                let calcPDM = plusDM.nextValue(tick);
                let calcMDM = minusDM.nextValue(tick);
                if (calcTr === undefined) {
                    tick = yield;
                    continue;
                }
                let lastATR = emaTR.nextValue(calcTr);
                let lastAPDM = emaPDM.nextValue(calcPDM);
                let lastAMDM = emaMDM.nextValue(calcMDM);
                if ((lastATR != undefined) && (lastAPDM != undefined) && (lastAMDM != undefined)) {
                    lastPDI = (lastAPDM) * 100 / lastATR;
                    lastMDI = (lastAMDM) * 100 / lastATR;
                    let diDiff = Math.abs(lastPDI - lastMDI);
                    let diSum = (lastPDI + lastMDI);
                    lastDX = (diDiff / diSum) * 100;
                    smoothedDX = emaDX.nextValue(lastDX);
                }
                tick = yield { adx: smoothedDX, pdi: lastPDI, mdi: lastMDI };
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value != undefined && result.value.adx != undefined) {
                this.result.push({ adx: format(result.value.adx), pdi: format(result.value.pdi), mdi: format(result.value.mdi) });
            }
        });
    }
    ;
    ;
    nextValue(price) {
        let result = this.generator.next(price).value;
        if (result != undefined && result.adx != undefined) {
            return { adx: this.format(result.adx), pdi: this.format(result.pdi), mdi: this.format(result.mdi) };
        }
    }
    ;
}
ADX.calculate = adx;
function adx(input) {
    Indicator.reverseInputs(input);
    var result = new ADX(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class ATR extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var period = input.period;
        var format = this.format;
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        var trueRange = new TrueRange({
            low: [],
            high: [],
            close: []
        });
        var wema$$1 = new WEMA({ period: period, values: [], format: (v) => { return v; } });
        this.result = [];
        this.generator = (function* () {
            var tick = yield;
            var avgTrueRange, trange;
            
            while (true) {
                trange = trueRange.nextValue({
                    low: tick.low,
                    high: tick.high,
                    close: tick.close
                });
                if (trange === undefined) {
                    avgTrueRange = undefined;
                }
                else {
                    avgTrueRange = wema$$1.nextValue(trange);
                }
                tick = yield avgTrueRange;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value !== undefined) {
                this.result.push(format(result.value));
            }
        });
    }
    ;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
ATR.calculate = atr;
function atr(input) {
    Indicator.reverseInputs(input);
    var result = new ATR(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class ROC extends Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        this.result = [];
        this.generator = (function* () {
            let index = 1;
            var pastPeriods = new FixedSizeLinkedList(period);
            
            var tick = yield;
            var roc;
            while (true) {
                pastPeriods.push(tick);
                if (index < period) {
                    index++;
                }
                else {
                    roc = ((tick - pastPeriods.lastShift) / (pastPeriods.lastShift)) * 100;
                }
                tick = yield roc;
            }
        })();
        this.generator.next();
        priceArray.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value != undefined && (!isNaN(result.value))) {
                this.result.push(this.format(result.value));
            }
        });
    }
    nextValue(price) {
        var nextResult = this.generator.next(price);
        if (nextResult.value != undefined && (!isNaN(nextResult.value))) {
            return this.format(nextResult.value);
        }
    }
    ;
}
ROC.calculate = roc;

function roc(input) {
    Indicator.reverseInputs(input);
    var result = new ROC(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class KST extends Indicator {
    constructor(input) {
        super(input);
        let priceArray = input.values;
        let rocPer1 = input.ROCPer1;
        let rocPer2 = input.ROCPer2;
        let rocPer3 = input.ROCPer3;
        let rocPer4 = input.ROCPer4;
        let smaPer1 = input.SMAROCPer1;
        let smaPer2 = input.SMAROCPer2;
        let smaPer3 = input.SMAROCPer3;
        let smaPer4 = input.SMAROCPer4;
        let signalPeriod = input.signalPeriod;
        let roc1 = new ROC({ period: rocPer1, values: [] });
        let roc2 = new ROC({ period: rocPer2, values: [] });
        let roc3 = new ROC({ period: rocPer3, values: [] });
        let roc4 = new ROC({ period: rocPer4, values: [] });
        let sma1 = new SMA({ period: smaPer1, values: [], format: (v) => { return v; } });
        let sma2 = new SMA({ period: smaPer2, values: [], format: (v) => { return v; } });
        let sma3 = new SMA({ period: smaPer3, values: [], format: (v) => { return v; } });
        let sma4 = new SMA({ period: smaPer4, values: [], format: (v) => { return v; } });
        let signalSMA = new SMA({ period: signalPeriod, values: [], format: (v) => { return v; } });
        var format = this.format;
        this.result = [];
        let firstResult = Math.max(rocPer1 + smaPer1, rocPer2 + smaPer2, rocPer3 + smaPer3, rocPer4 + smaPer4);
        this.generator = (function* () {
            let index = 1;
            let tick = yield;
            let kst;
            let RCMA1, RCMA2, RCMA3, RCMA4, signal, result;
            while (true) {
                let roc1Result = roc1.nextValue(tick);
                let roc2Result = roc2.nextValue(tick);
                let roc3Result = roc3.nextValue(tick);
                let roc4Result = roc4.nextValue(tick);
                RCMA1 = (roc1Result !== undefined) ? sma1.nextValue(roc1Result) : undefined;
                RCMA2 = (roc2Result !== undefined) ? sma2.nextValue(roc2Result) : undefined;
                RCMA3 = (roc3Result !== undefined) ? sma3.nextValue(roc3Result) : undefined;
                RCMA4 = (roc4Result !== undefined) ? sma4.nextValue(roc4Result) : undefined;
                if (index < firstResult) {
                    index++;
                }
                else {
                    kst = (RCMA1 * 1) + (RCMA2 * 2) + (RCMA3 * 3) + (RCMA4 * 4);
                }
                signal = (kst !== undefined) ? signalSMA.nextValue(kst) : undefined;
                result = kst !== undefined ? {
                    kst: format(kst),
                    signal: signal ? format(signal) : undefined
                } : undefined;
                tick = yield result;
            }
        })();
        this.generator.next();
        priceArray.forEach((tick) => {
            let result = this.generator.next(tick);
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    nextValue(price) {
        let nextResult = this.generator.next(price);
        if (nextResult.value != undefined)
            return nextResult.value;
    }
    ;
}
KST.calculate = kst;
function kst(input) {
    Indicator.reverseInputs(input);
    var result = new KST(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

/*
  There seems to be a few interpretations of the rules for this regarding which prices.
  I mean the english from which periods are included. The wording does seem to
  introduce some discrepancy so maybe that is why. I want to put the author's
  own description here to reassess this later.
  ----------------------------------------------------------------------------------------
  For the first day of entry the SAR is the previous Significant Point

  If long the SP is the lowest price reached while in the previous short trade
  If short the SP is the highest price reached while in the previous long trade

  If long:
  Find the difference between the highest price made while in the trade and the SAR for today.
  Multiple the difference by the AF and ADD the result to today's SAR to obtain the SAR for tomorrow.
  Use 0.02 for the first AF and increase it by 0.02 on every day that a new high for the trade is made.
  If a new high is not made continue to use the AF as last increased. Do not increase the AF above .20

  Never move the SAR for tomorrow ABOVE the previous day's LOW or today's LOW.
  If the SAR is calculated to be ABOVE the previous day's LOW or today's LOW then use the lower low between today and the previous day as the new SAR.
  Make the next day's calculations based on this SAR.

  If short:
  Find the difference between the lowest price made while in the trade and the SAR for today.
  Multiple the difference by the AF and SUBTRACT the result to today's SAR to obtain the SAR for tomorrow.
  Use 0.02 for the first AF and increase it by 0.02 on every day that a new high for the trade is made.
  If a new high is not made continue to use the AF as last increased. Do not increase the AF above .20

  Never move the SAR for tomorrow BELOW the previous day's HIGH or today's HIGH.
  If the SAR is calculated to be BELOW the previous day's HIGH or today's HIGH then use the higher high between today and the previous day as the new SAR. Make the next day's calculations based on this SAR.
  ----------------------------------------------------------------------------------------
*/


class PSAR extends Indicator {
    constructor(input) {
        super(input);
        let highs = input.high || [];
        let lows = input.low || [];
        var genFn = function* (step, max) {
            let curr, extreme, sar, furthest;
            let up = true;
            let accel = step;
            let prev = yield;
            while (true) {
                if (curr) {
                    sar = sar + accel * (extreme - sar);
                    if (up) {
                        sar = Math.min(sar, furthest.low, prev.low);
                        if (curr.high > extreme) {
                            extreme = curr.high;
                            accel = Math.min(accel + step, max);
                        }
                        
                    }
                    else {
                        sar = Math.max(sar, furthest.high, prev.high);
                        if (curr.low < extreme) {
                            extreme = curr.low;
                            accel = Math.min(accel + step, max);
                        }
                    }
                    if ((up && curr.low < sar) || (!up && curr.high > sar)) {
                        accel = step;
                        sar = extreme;
                        up = !up;
                        extreme = !up ? curr.low : curr.high;
                    }
                }
                else {
                    // Randomly setup start values? What is the trend on first tick??
                    sar = prev.low;
                    extreme = prev.high;
                }
                furthest = prev;
                if (curr)
                    prev = curr;
                curr = yield sar;
            }
        };
        this.result = [];
        this.generator = genFn(input.step, input.max);
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
            });
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    nextValue(input) {
        let nextResult = this.generator.next(input);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
PSAR.calculate = psar;
function psar(input) {
    Indicator.reverseInputs(input);
    var result = new PSAR(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class Stochastic extends Indicator {
    constructor(input) {
        super(input);
        let lows = input.low;
        let highs = input.high;
        let closes = input.close;
        let period = input.period;
        let signalPeriod = input.signalPeriod;
        let format = this.format;
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        //%K = (Current Close - Lowest Low)/(Highest High - Lowest Low) * 100
        //%D = 3-day SMA of %K
        //
        //Lowest Low = lowest low for the look-back period
        //Highest High = highest high for the look-back period
        //%K is multiplied by 100 to move the decimal point two places
        this.generator = (function* () {
            let index = 1;
            let pastHighPeriods = new FixedSizeLinkedList(period, true, false);
            let pastLowPeriods = new FixedSizeLinkedList(period, false, true);
            let dSma = new SMA({
                period: signalPeriod,
                values: [],
                format: (v) => { return v; }
            });
            let k, d;
            var tick = yield;
            while (true) {
                pastHighPeriods.push(tick.high);
                pastLowPeriods.push(tick.low);
                if (index < period) {
                    index++;
                    tick = yield;
                    continue;
                }
                let periodLow = pastLowPeriods.periodLow;
                k = (tick.close - periodLow) / (pastHighPeriods.periodHigh - periodLow) * 100;
                k = isNaN(k) ? 0 : k; //This happens when the close, high and low are same for the entire period; Bug fix for 
                d = dSma.nextValue(k);
                tick = yield {
                    k: format(k),
                    d: (d !== undefined) ? format(d) : undefined
                };
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    nextValue(input) {
        let nextResult = this.generator.next(input);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
Stochastic.calculate = stochastic;
function stochastic(input) {
    Indicator.reverseInputs(input);
    var result = new Stochastic(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class WilliamsR extends Indicator {
    constructor(input) {
        super(input);
        let lows = input.low;
        let highs = input.high;
        let closes = input.close;
        let period = input.period;
        let format = this.format;
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        //%R = (Highest High - Close)/(Highest High - Lowest Low) * -100
        //Lowest Low = lowest low for the look-back period
        //Highest High = highest high for the look-back period
        //%R is multiplied by -100 correct the inversion and move the decimal.
        this.generator = (function* () {
            let index = 1;
            let pastHighPeriods = new FixedSizeLinkedList(period, true, false);
            let pastLowPeriods = new FixedSizeLinkedList(period, false, true);
            let periodLow;
            let periodHigh;
            var tick = yield;
            let williamsR;
            while (true) {
                pastHighPeriods.push(tick.high);
                pastLowPeriods.push(tick.low);
                if (index < period) {
                    index++;
                    tick = yield;
                    continue;
                }
                periodLow = pastLowPeriods.periodLow;
                periodHigh = pastHighPeriods.periodHigh;
                williamsR = format((periodHigh - tick.close) / (periodHigh - periodLow) * -100);
                tick = yield williamsR;
            }
        })();
        this.generator.next();
        lows.forEach((low, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    nextValue(price) {
        var nextResult = this.generator.next(price);
        if (nextResult.value != undefined)
            return this.format(nextResult.value);
    }
    ;
}
WilliamsR.calculate = williamsr;
function williamsr(input) {
    Indicator.reverseInputs(input);
    var result = new WilliamsR(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class ADL extends Indicator {
    constructor(input) {
        super(input);
        var highs = input.high;
        var lows = input.low;
        var closes = input.close;
        var volumes = input.volume;
        if (!((lows.length === highs.length) && (highs.length === closes.length) && (highs.length === volumes.length))) {
            throw ('Inputs(low,high, close, volumes) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var result = 0;
            var tick;
            tick = yield;
            while (true) {
                let moneyFlowMultiplier = ((tick.close - tick.low) - (tick.high - tick.close)) / (tick.high - tick.low);
                moneyFlowMultiplier = isNaN(moneyFlowMultiplier) ? 1 : moneyFlowMultiplier;
                let moneyFlowVolume = moneyFlowMultiplier * tick.volume;
                result = result + moneyFlowVolume;
                tick = yield Math.round(result);
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
ADL.calculate = adl;
function adl(input) {
    Indicator.reverseInputs(input);
    var result = new ADL(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class OBV extends Indicator {
    constructor(input) {
        super(input);
        var closes = input.close;
        var volumes = input.volume;
        this.result = [];
        this.generator = (function* () {
            var result = 0;
            var tick;
            var lastClose;
            tick = yield;
            if (tick.close && (typeof tick.close === 'number')) {
                lastClose = tick.close;
                tick = yield;
            }
            while (true) {
                if (lastClose < tick.close) {
                    result = result + tick.volume;
                }
                else if (tick.close < lastClose) {
                    result = result - tick.volume;
                }
                lastClose = tick.close;
                tick = yield result;
            }
        })();
        this.generator.next();
        closes.forEach((close, index) => {
            let tickInput = {
                close: closes[index],
                volume: volumes[index]
            };
            let result = this.generator.next(tickInput);
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
OBV.calculate = obv;
function obv(input) {
    Indicator.reverseInputs(input);
    var result = new OBV(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

/**
 * Created by AAravindan on 5/9/16.
 */


class TRIX extends Indicator {
    constructor(input) {
        super(input);
        let priceArray = input.values;
        let period = input.period;
        let format = this.format;
        let ema$$1 = new EMA({ period: period, values: [], format: (v) => { return v; } });
        let emaOfema = new EMA({ period: period, values: [], format: (v) => { return v; } });
        let emaOfemaOfema = new EMA({ period: period, values: [], format: (v) => { return v; } });
        let trixROC = new ROC({ period: 1, values: [], format: (v) => { return v; } });
        this.result = [];
        this.generator = (function* () {
            let tick = yield;
            while (true) {
                let initialema = ema$$1.nextValue(tick);
                let smoothedResult = initialema ? emaOfema.nextValue(initialema) : undefined;
                let doubleSmoothedResult = smoothedResult ? emaOfemaOfema.nextValue(smoothedResult) : undefined;
                let result = doubleSmoothedResult ? trixROC.nextValue(doubleSmoothedResult) : undefined;
                tick = yield result ? format(result) : undefined;
            }
        })();
        this.generator.next();
        priceArray.forEach((tick) => {
            let result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    nextValue(price) {
        let nextResult = this.generator.next(price);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
TRIX.calculate = trix;
function trix(input) {
    Indicator.reverseInputs(input);
    var result = new TRIX(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class ForceIndex extends Indicator {
    constructor(input) {
        super(input);
        var closes = input.close;
        var volumes = input.volume;
        var period = input.period || 1;
        if (!((volumes.length === closes.length))) {
            throw ('Inputs(volume, close) not of equal size');
        }
        let emaForceIndex = new EMA({ values: [], period: period });
        this.result = [];
        this.generator = (function* () {
            var previousTick = yield;
            var tick = yield;
            let forceIndex;
            while (true) {
                forceIndex = (tick.close - previousTick.close) * tick.volume;
                previousTick = tick;
                tick = yield emaForceIndex.nextValue(forceIndex);
            }
        })();
        this.generator.next();
        volumes.forEach((tick, index) => {
            var result = this.generator.next({
                close: closes[index],
                volume: volumes[index]
            });
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    ;
    nextValue(price) {
        let result = this.generator.next(price).value;
        if (result != undefined) {
            return result;
        }
    }
    ;
}
ForceIndex.calculate = forceindex;
function forceindex(input) {
    Indicator.reverseInputs(input);
    var result = new ForceIndex(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class CCI extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var period = input.period;
        var format = this.format;
        let constant = .015;
        var currentTpSet = new FixedSizeLinkedList(period);
        
        var tpSMACalculator = new SMA({ period: period, values: [], format: (v) => { return v; } });
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var tick = yield;
            while (true) {
                let tp = (tick.high + tick.low + tick.close) / 3;
                currentTpSet.push(tp);
                let smaTp = tpSMACalculator.nextValue(tp);
                let meanDeviation = null;
                let cci;
                let sum = 0;
                if (smaTp != undefined) {
                    //First, subtract the most recent 20-period average of the typical price from each period's typical price. 
                    //Second, take the absolute values of these numbers.
                    //Third,sum the absolute values. 
                    for (let x of currentTpSet.iterator()) {
                        sum = sum + (Math.abs(x - smaTp));
                    }
                    //Fourth, divide by the total number of periods (20). 
                    meanDeviation = sum / 20;
                    cci = (tp - smaTp) / (constant * meanDeviation);
                }
                tick = yield cci;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    ;
    nextValue(price) {
        let result = this.generator.next(price).value;
        if (result != undefined) {
            return result;
        }
    }
    ;
}
CCI.calculate = cci;
function cci(input) {
    Indicator.reverseInputs(input);
    var result = new CCI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class VWAP extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var volumes = input.volume;
        var format = this.format;
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var tick = yield;
            let cumulativeTotal = 0;
            let cumulativeVolume = 0;
            while (true) {
                let typicalPrice = (tick.high + tick.low + tick.close) / 3;
                let total = tick.volume * typicalPrice;
                cumulativeTotal = cumulativeTotal + total;
                cumulativeVolume = cumulativeVolume + tick.volume;
                tick = yield cumulativeTotal / cumulativeVolume;
                
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index],
                volume: volumes[index]
            });
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    ;
    nextValue(price) {
        let result = this.generator.next(price).value;
        if (result != undefined) {
            return result;
        }
    }
    ;
}
VWAP.calculate = vwap;
function vwap(input) {
    Indicator.reverseInputs(input);
    var result = new VWAP(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class TypicalPrice extends Indicator {
    constructor(input) {
        super(input);
        this.result = [];
        this.generator = (function* () {
            let priceInput = yield;
            while (true) {
                priceInput = yield (priceInput.high + priceInput.low + priceInput.close) / 3;
            }
        })();
        this.generator.next();
        input.low.forEach((tick, index) => {
            var result = this.generator.next({
                high: input.high[index],
                low: input.low[index],
                close: input.close[index],
            });
            this.result.push(result.value);
        });
    }
    nextValue(price) {
        var result = this.generator.next(price).value;
        return result;
    }
    ;
}
TypicalPrice.calculate = typicalprice;
function typicalprice(input) {
    Indicator.reverseInputs(input);
    var result = new TypicalPrice(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class MFI extends Indicator {
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
            let typicalPriceValue;
            tick = yield;
            lastClose = tick.close; //Fist value 
            tick = yield;
            while (true) {
                var { high, low, close, volume } = tick;
                var positionMoney = 0;
                var negativeMoney = 0;
                typicalPriceValue = typicalPrice.nextValue({ high, low, close });
                rawMoneyFlow = typicalPriceValue * volume;
                close > lastClose ? positionMoney = rawMoneyFlow : negativeMoney = rawMoneyFlow;
                positiveFlow.push(positionMoney);
                negativeFlow.push(negativeMoney);
                positiveFlowForPeriod = positiveFlow.periodSum;
                negativeFlowForPeriod = negativeFlow.periodSum;
                if ((positiveFlow.totalPushed >= period) && (positiveFlow.totalPushed >= period)) {
                    moneyFlowRatio = positiveFlowForPeriod / negativeFlowForPeriod;
                    result = 100 - 100 / (1 + moneyFlowRatio);
                }
                lastClose = close;
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
function mfi(input) {
    Indicator.reverseInputs(input);
    var result = new MFI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

class StochasticRSI extends Indicator {
    constructor(input) {
        super(input);
        let closes = input.values;
        let rsiPeriod = input.rsiPeriod;
        let stochasticPeriod = input.stochasticPeriod;
        let kPeriod = input.kPeriod;
        let dPeriod = input.dPeriod;
        let format = this.format;
        this.result = [];
        this.generator = (function* () {
            let index = 1;
            let rsi$$1 = new RSI({ period: rsiPeriod, values: [] });
            let stochastic$$1 = new Stochastic({ period: stochasticPeriod, high: [], low: [], close: [], signalPeriod: kPeriod });
            let dSma = new SMA({
                period: dPeriod,
                values: [],
                format: (v) => { return v; }
            });
            let lastRSI, stochasticRSI, d, result;
            var tick = yield;
            while (true) {
                lastRSI = rsi$$1.nextValue(tick);
                if (lastRSI !== undefined) {
                    var stochasticInput = { high: lastRSI, low: lastRSI, close: lastRSI };
                    stochasticRSI = stochastic$$1.nextValue(stochasticInput);
                    if (stochasticRSI !== undefined && stochasticRSI.d !== undefined) {
                        d = dSma.nextValue(stochasticRSI.d);
                        if (d !== undefined)
                            result = {
                                stochRSI: stochasticRSI.k,
                                k: stochasticRSI.d,
                                d: d
                            };
                    }
                }
                tick = yield result;
            }
        })();
        this.generator.next();
        closes.forEach((tick, index) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    nextValue(input) {
        let nextResult = this.generator.next(input);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
StochasticRSI.calculate = stochasticrsi;
function stochasticrsi(input) {
    Indicator.reverseInputs(input);
    var result = new StochasticRSI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
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
function renko(input) {
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

class HeikinAshi extends Indicator {
    constructor(input) {
        super(input);
        var format = this.format;
        this.result = new CandleList();
        let lastOpen = null;
        let lastHigh = 0;
        let lastLow = Infinity;
        let lastClose = 0;
        let lastVolume = 0;
        let lastTimestamp = 0;
        this.generator = (function* () {
            let candleData = yield;
            let calculated = null;
            while (true) {
                if (lastOpen === null) {
                    lastOpen = (candleData.close + candleData.open) / 2;
                    lastHigh = candleData.high;
                    lastLow = candleData.low;
                    lastClose = (candleData.close + candleData.open + candleData.high + candleData.low) / 4;
                    lastVolume = (candleData.volume || 0);
                    lastTimestamp = (candleData.timestamp || 0);
                    calculated = {
                        open: lastOpen,
                        high: lastHigh,
                        low: lastLow,
                        close: lastClose,
                        volume: candleData.volume || 0,
                        timestamp: (candleData.timestamp || 0)
                    };
                }
                else {
                    let newClose = (candleData.close + candleData.open + candleData.high + candleData.low) / 4;
                    let newOpen = (lastOpen + lastClose) / 2;
                    let newHigh = Math.max(newOpen, newClose, candleData.high);
                    let newLow = Math.min(candleData.low, newOpen, newClose);
                    calculated = {
                        close: newClose,
                        open: newOpen,
                        high: newHigh,
                        low: newLow,
                        volume: (candleData.volume || 0),
                        timestamp: (candleData.timestamp || 0)
                    };
                    lastClose = newClose;
                    lastOpen = newOpen;
                    lastHigh = newHigh;
                    lastLow = newLow;
                }
                candleData = yield calculated;
            }
        })();
        this.generator.next();
        input.low.forEach((tick, index) => {
            var result = this.generator.next({
                open: input.open[index],
                high: input.high[index],
                low: input.low[index],
                close: input.close[index],
                volume: input.volume ? input.volume[index] : input.volume,
                timestamp: input.timestamp ? input.timestamp[index] : input.timestamp
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
        var result = this.generator.next(price).value;
        return result;
    }
    ;
}
HeikinAshi.calculate = heikinashi;
function heikinashi(input) {
    Indicator.reverseInputs(input);
    var result = new HeikinAshi(input).result;
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

class CandlestickFinder {
    constructor() {
        // if (new.target === Abstract) {
        //     throw new TypeError("Abstract class");
        // }
    }
    approximateEqual(a, b) {
        let left = parseFloat(Math.abs(a - b).toPrecision(4)) * 1;
        let right = parseFloat((a * 0.001).toPrecision(4)) * 1;
        return left <= right;
    }
    logic(data) {
        throw "this has to be implemented";
    }
    getAllPatternIndex(data) {
        if (data.close.length < this.requiredCount) {
            console.warn('Data count less than data required for the strategy ', this.name);
            return [];
        }
        if (data.reversedInput) {
            data.open.reverse();
            data.high.reverse();
            data.low.reverse();
            data.close.reverse();
        }
        let strategyFn = this.logic;
        return this._generateDataForCandleStick(data)
            .map((current, index) => {
            return strategyFn.call(this, current) ? index : undefined;
        }).filter((hasIndex) => {
            return hasIndex;
        });
    }
    hasPattern(data) {
        if (data.close.length < this.requiredCount) {
            console.warn('Data count less than data required for the strategy ', this.name);
            return false;
        }
        if (data.reversedInput) {
            data.open.reverse();
            data.high.reverse();
            data.low.reverse();
            data.close.reverse();
        }
        let strategyFn = this.logic;
        return strategyFn.call(this, this._getLastDataForCandleStick(data));
    }
    _getLastDataForCandleStick(data) {
        let requiredCount = this.requiredCount;
        if (data.close.length === requiredCount) {
            return data;
        }
        else {
            let returnVal = {
                open: [],
                high: [],
                low: [],
                close: []
            };
            let i = 0;
            let index = data.close.length - requiredCount;
            while (i < requiredCount) {
                returnVal.open.push(data.open[index + i]);
                returnVal.high.push(data.high[index + i]);
                returnVal.low.push(data.low[index + i]);
                returnVal.close.push(data.close[index + i]);
                i++;
            }
            return returnVal;
        }
    }
    _generateDataForCandleStick(data) {
        let requiredCount = this.requiredCount;
        let generatedData = data.close.map(function (currentData, index) {
            let i = 0;
            let returnVal = {
                open: [],
                high: [],
                low: [],
                close: []
            };
            while (i < requiredCount) {
                returnVal.open.push(data.open[index + i]);
                returnVal.high.push(data.high[index + i]);
                returnVal.low.push(data.low[index + i]);
                returnVal.close.push(data.close[index + i]);
                i++;
            }
            return returnVal;
        }).filter((val, index) => { return (index <= (data.close.length - requiredCount)); });
        return generatedData;
    }
}

class MorningStar extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'MorningStar';
        this.requiredCount = 3;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let firstdaysMidpoint = ((firstdaysOpen + firstdaysClose) / 2);
        let isFirstBearish = firstdaysClose < firstdaysOpen;
        let isSmallBodyExists = ((firstdaysLow > seconddaysLow) &&
            (firstdaysLow > seconddaysHigh));
        let isThirdBullish = thirddaysOpen < thirddaysClose;
        let gapExists = ((seconddaysHigh < firstdaysLow) &&
            (seconddaysLow < firstdaysLow) &&
            (thirddaysOpen > seconddaysHigh) &&
            (seconddaysClose < thirddaysOpen));
        let doesCloseAboveFirstMidpoint = thirddaysClose > firstdaysMidpoint;
        return (isFirstBearish && isSmallBodyExists && gapExists && isThirdBullish && doesCloseAboveFirstMidpoint);
    }
}
function morningstar(data) {
    return new MorningStar().hasPattern(data);
}

class BullishEngulfingPattern extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BullishEngulfingPattern';
        this.requiredCount = 2;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let isBullishEngulfing = ((firstdaysClose < firstdaysOpen) &&
            (firstdaysOpen > seconddaysOpen) &&
            (firstdaysClose > seconddaysOpen) &&
            (firstdaysOpen < seconddaysClose));
        return (isBullishEngulfing);
    }
}
function bullishengulfingpattern(data) {
    return new BullishEngulfingPattern().hasPattern(data);
}

class BullishHarami extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 2;
        this.name = "BullishHarami";
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let isBullishHaramiPattern = ((firstdaysOpen < seconddaysOpen) &&
            (firstdaysClose > seconddaysOpen) &&
            (firstdaysClose > seconddaysClose) &&
            (firstdaysOpen < seconddaysLow) &&
            (firstdaysHigh > seconddaysHigh));
        return (isBullishHaramiPattern);
    }
}
function bullishharami(data) {
    return new BullishHarami().hasPattern(data);
}

class BullishHaramiCross extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 2;
        this.name = 'BullishHaramiCross';
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let isBullishHaramiCrossPattern = ((firstdaysOpen < seconddaysOpen) &&
            (firstdaysClose > seconddaysOpen) &&
            (firstdaysClose > seconddaysClose) &&
            (firstdaysOpen < seconddaysLow) &&
            (firstdaysHigh > seconddaysHigh));
        let isSecondDayDoji = this.approximateEqual(seconddaysOpen, seconddaysClose);
        return (isBullishHaramiCrossPattern && isSecondDayDoji);
    }
}
function bullishharamicross(data) {
    return new BullishHaramiCross().hasPattern(data);
}

class Doji extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Doji';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        return this.approximateEqual(daysOpen, daysClose);
    }
}
function doji(data) {
    return new Doji().hasPattern(data);
}

class MorningDojiStar extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'MorningDojiStar';
        this.requiredCount = 3;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let firstdaysMidpoint = ((firstdaysOpen + firstdaysClose) / 2);
        let isFirstBearish = firstdaysClose < firstdaysOpen;
        let dojiExists = new Doji().hasPattern({
            "open": [seconddaysOpen],
            "close": [seconddaysClose],
            "high": [seconddaysHigh],
            "low": [seconddaysLow]
        });
        let isThirdBullish = thirddaysOpen < thirddaysClose;
        let gapExists = ((seconddaysHigh < firstdaysLow) &&
            (seconddaysLow < firstdaysLow) &&
            (thirddaysOpen > seconddaysHigh) &&
            (seconddaysClose < thirddaysOpen));
        let doesCloseAboveFirstMidpoint = thirddaysClose > firstdaysMidpoint;
        return (isFirstBearish && dojiExists && isThirdBullish && gapExists &&
            doesCloseAboveFirstMidpoint);
    }
}
function morningdojistar(data) {
    return new MorningDojiStar().hasPattern(data);
}

class DownsideTasukiGap extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 3;
        this.name = 'DownsideTasukiGap';
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let isFirstBearish = firstdaysClose < firstdaysOpen;
        let isSecondBearish = seconddaysClose < seconddaysOpen;
        let isThirdBullish = thirddaysClose > thirddaysOpen;
        let isFirstGapExists = seconddaysHigh < firstdaysLow;
        let isDownsideTasukiGap = ((seconddaysOpen > thirddaysOpen) &&
            (seconddaysClose < thirddaysOpen) &&
            (thirddaysClose > seconddaysOpen) &&
            (thirddaysClose < firstdaysClose));
        return (isFirstBearish && isSecondBearish && isThirdBullish && isFirstGapExists && isDownsideTasukiGap);
    }
}
function downsidetasukigap(data) {
    return new DownsideTasukiGap().hasPattern(data);
}

class BullishMarubozu extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BullishMarubozu';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isBullishMarbozu = this.approximateEqual(daysClose, daysHigh) &&
            this.approximateEqual(daysLow, daysOpen) &&
            daysOpen < daysClose &&
            daysOpen < daysHigh;
        return (isBullishMarbozu);
    }
}
function bullishmarubozu(data) {
    return new BullishMarubozu().hasPattern(data);
}

class PiercingLine extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 2;
        this.name = 'PiercingLine';
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let firstdaysMidpoint = ((firstdaysOpen + firstdaysClose) / 2);
        let isDowntrend = seconddaysLow < firstdaysLow;
        let isFirstBearish = firstdaysClose < firstdaysOpen;
        let isSecondBullish = seconddaysClose > seconddaysOpen;
        let isPiercingLinePattern = ((firstdaysLow > seconddaysOpen) &&
            (seconddaysClose > firstdaysMidpoint));
        return (isDowntrend && isFirstBearish && isPiercingLinePattern && isSecondBullish);
    }
}
function piercingline(data) {
    return new PiercingLine().hasPattern(data);
}

class ThreeWhiteSoldiers extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'ThreeWhiteSoldiers';
        this.requiredCount = 3;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let isUpTrend = seconddaysHigh > firstdaysHigh &&
            thirddaysHigh > seconddaysHigh;
        let isAllBullish = firstdaysOpen < firstdaysClose &&
            seconddaysOpen < seconddaysClose &&
            thirddaysOpen < thirddaysClose;
        let doesOpenWithinPreviousBody = firstdaysClose > seconddaysOpen &&
            seconddaysOpen < firstdaysHigh &&
            seconddaysHigh > thirddaysOpen &&
            thirddaysOpen < seconddaysClose;
        return (isUpTrend && isAllBullish && doesOpenWithinPreviousBody);
    }
}
function threewhitesoldiers(data) {
    return new ThreeWhiteSoldiers().hasPattern(data);
}

let bullishPatterns = [new BullishEngulfingPattern(), new DownsideTasukiGap(), new BullishHarami(), new BullishHaramiCross(),
    new MorningDojiStar(), new MorningStar(), new BullishMarubozu(), new PiercingLine(), new ThreeWhiteSoldiers()];
class BullishPatterns extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Bullish Candlesticks';
    }
    hasPattern(data) {
        return bullishPatterns.reduce(function (state, pattern) {
            let result = pattern.hasPattern(data);
            return state || result;
        }, false);
    }
}
function bullish(data) {
    return new BullishPatterns().hasPattern(data);
}

class BearishEngulfingPattern extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishEngulfingPattern';
        this.requiredCount = 2;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let isBearishEngulfing = ((firstdaysClose > firstdaysOpen) &&
            (firstdaysOpen < seconddaysOpen) &&
            (firstdaysClose < seconddaysOpen) &&
            (firstdaysOpen > seconddaysClose));
        return (isBearishEngulfing);
    }
}
function bearishengulfingpattern(data) {
    return new BearishEngulfingPattern().hasPattern(data);
}

class BearishHarami extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 2;
        this.name = 'BearishHarami';
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let isBearishHaramiPattern = ((firstdaysOpen > seconddaysOpen) &&
            (firstdaysClose < seconddaysOpen) &&
            (firstdaysClose < seconddaysClose) &&
            (firstdaysOpen > seconddaysLow) &&
            (firstdaysHigh > seconddaysHigh));
        return (isBearishHaramiPattern);
    }
}
function bearishharami(data) {
    return new BearishHarami().hasPattern(data);
}

class BearishHaramiCross extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 2;
        this.name = 'BearishHaramiCross';
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let isBearishHaramiCrossPattern = ((firstdaysOpen > seconddaysOpen) &&
            (firstdaysClose < seconddaysOpen) &&
            (firstdaysClose < seconddaysClose) &&
            (firstdaysOpen > seconddaysLow) &&
            (firstdaysHigh > seconddaysHigh));
        let isSecondDayDoji = this.approximateEqual(seconddaysOpen, seconddaysClose);
        return (isBearishHaramiCrossPattern && isSecondDayDoji);
    }
}
function bearishharamicross(data) {
    return new BearishHaramiCross().hasPattern(data);
}

class EveningDojiStar extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'EveningDojiStar';
        this.requiredCount = 3;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let firstdaysMidpoint = ((firstdaysOpen + firstdaysClose) / 2);
        let isFirstBullish = firstdaysClose > firstdaysOpen;
        let dojiExists = new Doji().hasPattern({
            "open": [seconddaysOpen],
            "close": [seconddaysClose],
            "high": [seconddaysHigh],
            "low": [seconddaysLow]
        });
        let isThirdBearish = thirddaysOpen > thirddaysClose;
        let gapExists = ((seconddaysHigh > firstdaysHigh) &&
            (seconddaysLow > firstdaysHigh) &&
            (thirddaysOpen < seconddaysLow) &&
            (seconddaysClose > thirddaysOpen));
        let doesCloseBelowFirstMidpoint = thirddaysClose < firstdaysMidpoint;
        return (isFirstBullish && dojiExists && gapExists && isThirdBearish && doesCloseBelowFirstMidpoint);
    }
}
function eveningdojistar(data) {
    return new EveningDojiStar().hasPattern(data);
}

class EveningStar extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'EveningStar';
        this.requiredCount = 3;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let firstdaysMidpoint = ((firstdaysOpen + firstdaysClose) / 2);
        let isFirstBullish = firstdaysClose > firstdaysOpen;
        let isSmallBodyExists = ((firstdaysHigh < seconddaysLow) &&
            (firstdaysHigh < seconddaysHigh));
        let isThirdBearish = thirddaysOpen > thirddaysClose;
        let gapExists = ((seconddaysHigh > firstdaysHigh) &&
            (seconddaysLow > firstdaysHigh) &&
            (thirddaysOpen < seconddaysLow) &&
            (seconddaysClose > thirddaysOpen));
        let doesCloseBelowFirstMidpoint = thirddaysClose < firstdaysMidpoint;
        return (isFirstBullish && isSmallBodyExists && gapExists && isThirdBearish && doesCloseBelowFirstMidpoint);
    }
}
function eveningstar(data) {
    return new EveningStar().hasPattern(data);
}

class BearishMarubozu extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishMarubozu';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isBearishMarbozu = this.approximateEqual(daysOpen, daysHigh) &&
            this.approximateEqual(daysLow, daysClose) &&
            daysOpen > daysClose &&
            daysOpen > daysLow;
        return (isBearishMarbozu);
    }
}
function bearishmarubozu(data) {
    return new BearishMarubozu().hasPattern(data);
}

class ThreeBlackCrows extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'ThreeBlackCrows';
        this.requiredCount = 3;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let isDownTrend = firstdaysLow > seconddaysLow &&
            seconddaysLow > thirddaysLow;
        let isAllBearish = firstdaysOpen > firstdaysClose &&
            seconddaysOpen > seconddaysClose &&
            thirddaysOpen > thirddaysClose;
        let doesOpenWithinPreviousBody = firstdaysOpen > seconddaysOpen &&
            seconddaysOpen > firstdaysClose &&
            seconddaysOpen > thirddaysOpen &&
            thirddaysOpen > seconddaysClose;
        return (isDownTrend && isAllBearish && doesOpenWithinPreviousBody);
    }
}
function threeblackcrows(data) {
    return new ThreeBlackCrows().hasPattern(data);
}

let bearishPatterns = [new BearishEngulfingPattern(), new BearishHarami(), new BearishHaramiCross(), new EveningDojiStar(),
    new EveningStar(), new BearishMarubozu(), new ThreeBlackCrows()];
class BearishPatterns extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Bearish Candlesticks';
    }
    hasPattern(data) {
        return bearishPatterns.reduce(function (state, pattern) {
            return state || pattern.hasPattern(data);
        }, false);
    }
}
function bearish(data) {
    return new BearishPatterns().hasPattern(data);
}

class AbandonedBaby extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'AbandonedBaby';
        this.requiredCount = 3;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let isFirstBearish = firstdaysClose < firstdaysOpen;
        let dojiExists = new Doji().hasPattern({
            "open": [seconddaysOpen],
            "close": [seconddaysClose],
            "high": [seconddaysHigh],
            "low": [seconddaysLow]
        });
        let gapExists = ((seconddaysHigh < firstdaysLow) &&
            (thirddaysLow > seconddaysHigh) &&
            (thirddaysClose > thirddaysOpen));
        let isThirdBullish = (thirddaysHigh < firstdaysOpen);
        return (isFirstBearish && dojiExists && gapExists && isThirdBullish);
    }
}
function abandonedbaby(data) {
    return new AbandonedBaby().hasPattern(data);
}

class DarkCloudCover extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'DarkCloudCover';
        this.requiredCount = 2;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let firstdayMidpoint = ((firstdaysClose + firstdaysOpen) / 2);
        let isFirstBullish = firstdaysClose > firstdaysOpen;
        let isSecondBearish = seconddaysClose < seconddaysOpen;
        let isDarkCloudPattern = ((seconddaysOpen > firstdaysHigh) &&
            (seconddaysClose < firstdayMidpoint) &&
            (seconddaysClose > firstdaysOpen));
        return (isFirstBullish && isSecondBearish && isDarkCloudPattern);
    }
}
function darkcloudcover(data) {
    return new DarkCloudCover().hasPattern(data);
}

class DragonFlyDoji extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 1;
        this.name = 'DragonFlyDoji';
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let isOpenEqualsClose = this.approximateEqual(daysOpen, daysClose);
        let isHighEqualsOpen = this.approximateEqual(daysOpen, daysHigh);
        return (isOpenEqualsClose && isHighEqualsOpen);
    }
}
function dragonflydoji(data) {
    return new DragonFlyDoji().hasPattern(data);
}

class GraveStoneDoji extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 1;
        this.name = 'GraveStoneDoji';
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysLow = data.low[0];
        let isOpenEqualsClose = this.approximateEqual(daysOpen, daysClose);
        let isLowEqualsOpen = this.approximateEqual(daysOpen, daysLow);
        return (isOpenEqualsClose && isLowEqualsOpen);
    }
}
function gravestonedoji(data) {
    return new GraveStoneDoji().hasPattern(data);
}

class BullishSpinningTop extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BullishSpinningTop';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let bodyLength = Math.abs(daysClose - daysOpen);
        let upperShadowLength = Math.abs(daysHigh - daysClose);
        let lowerShadowLength = Math.abs(daysOpen - daysLow);
        let isBullishSpinningTop = bodyLength < upperShadowLength &&
            bodyLength < lowerShadowLength;
        return isBullishSpinningTop;
    }
}
function bullishspinningtop(data) {
    return new BullishSpinningTop().hasPattern(data);
}

class BearishSpinningTop extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishSpinningTop';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let bodyLength = Math.abs(daysClose - daysOpen);
        let upperShadowLength = Math.abs(daysHigh - daysOpen);
        let lowerShadowLength = Math.abs(daysHigh - daysLow);
        let isBearishSpinningTop = bodyLength < upperShadowLength &&
            bodyLength < lowerShadowLength;
        return isBearishSpinningTop;
    }
}
function bearishspinningtop(data) {
    return new BearishSpinningTop().hasPattern(data);
}

/**
 * Calcaultes the fibonacci retracements for given start and end points
 *
 * If calculating for up trend start should be low and end should be high and vice versa
 *
 * returns an array of retracements level containing [0 , 23.6, 38.2, 50, 61.8, 78.6, 100, 127.2, 161.8, 261.8, 423.6]
 *
 * @export
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
function fibonacciretracement(start, end) {
    let levels = [0, 23.6, 38.2, 50, 61.8, 78.6, 100, 127.2, 161.8, 261.8, 423.6];
    let retracements;
    if (start < end) {
        retracements = levels.map(function (level) {
            let calculated = end - Math.abs(start - end) * (level) / 100;
            return calculated > 0 ? calculated : 0;
        });
    }
    else {
        retracements = levels.map(function (level) {
            let calculated = end + Math.abs(start - end) * (level) / 100;
            return calculated > 0 ? calculated : 0;
        });
    }
    return retracements;
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var isNodeEnvironment = false;
try {
    isNodeEnvironment = Object.prototype.toString.call(global.process) === '[object process]';
}
catch (e) { }
var modelPath = getConfig('MODEL_PATH') || '/dist/model.bin';
var model = new KerasJS.Model({
    filepath: isNodeEnvironment ? __dirname + '/model.bin' : modelPath,
    gpu: false,
    filesystem: isNodeEnvironment
});


(function (AvailablePatterns) {
    AvailablePatterns[AvailablePatterns['TD'] = 0] = 'TD';
    AvailablePatterns[AvailablePatterns['IHS'] = 1] = 'IHS';
    AvailablePatterns[AvailablePatterns['HS'] = 2] = 'HS';
    AvailablePatterns[AvailablePatterns['TU'] = 3] = 'TU';
    AvailablePatterns[AvailablePatterns['DT'] = 4] = 'DT';
    AvailablePatterns[AvailablePatterns['DB'] = 5] = 'DB';
})(exports.AvailablePatterns || (exports.AvailablePatterns = {}));
function interpolateArray(data, fitCount) {
    var linearInterpolate = function (before, after, atPoint) {
        return before + (after - before) * atPoint;
    };
    var newData = new Array();
    var springFactor = new Number((data.length - 1) / (fitCount - 1));
    newData[0] = data[0]; // for new allocation
    for (var i = 1; i < fitCount - 1; i++) {
        var tmp = i * springFactor;
        var before = new Number(Math.floor(tmp)).toFixed();
        var after = new Number(Math.ceil(tmp)).toFixed();
        var atPoint = tmp - before;
        newData[i] = linearInterpolate(data[before], data[after], atPoint);
    }
    newData[fitCount - 1] = data[data.length - 1]; // for new allocation
    return newData;
}

function l2Normalize(arr) {
    var sum = arr.reduce((cum, value) => { return cum + (value * value); }, 0);
    var norm = Math.sqrt(sum);
    return arr.map((v) => v / norm);
}

function predictPattern(input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (input.values.length < 200) {
            console.warn('Pattern detector requires atleast 250 data for a reliable prediction, received just ', input.values.length);
        }
        yield model.ready();
        Indicator.reverseInputs(input);
        var data = input.values;
        var closes = l2Normalize(interpolateArray(data, 400));
        let result = yield model.predict({
            input: new Float32Array(closes)
        });
        var index = result.output.indexOf(Math.max(...result.output));
        Indicator.reverseInputs(input);
        return {
            pattern: exports.AvailablePatterns[index],
            patternId: index,
            probability: result.output[index] * 100
        };
    });
}
function hasDoubleBottom(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === exports.AvailablePatterns.DB && result.probability > 75);
    });
}
function hasDoubleTop(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === exports.AvailablePatterns.DT && result.probability > 75);
    });
}
function hasHeadAndShoulder(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === exports.AvailablePatterns.HS && result.probability > 75);
    });
}
function hasInverseHeadAndShoulder(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === exports.AvailablePatterns.IHS && result.probability > 75);
    });
}
function isTrendingUp(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === exports.AvailablePatterns.TU && result.probability > 75);
    });
}
function isTrendingDown(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === exports.AvailablePatterns.TD && result.probability > 75);
    });
}
class PatternDetector extends Indicator {
}
PatternDetector.predictPattern = predictPattern;
PatternDetector.hasDoubleBottom = hasDoubleBottom;
PatternDetector.hasDoubleTop = hasDoubleTop;
PatternDetector.hasHeadAndShoulder = hasHeadAndShoulder;
PatternDetector.hasInverseHeadAndShoulder = hasInverseHeadAndShoulder;
PatternDetector.isTrendingUp = isTrendingUp;
PatternDetector.isTrendingDown = isTrendingDown;

function getAvailableIndicators () {
  let AvailableIndicators   = [];
  AvailableIndicators.push('sma');
  AvailableIndicators.push('ema');
  AvailableIndicators.push('wma');
  AvailableIndicators.push('wema');
  AvailableIndicators.push('macd');
  AvailableIndicators.push('rsi');
  AvailableIndicators.push('bollingerbands');
  AvailableIndicators.push('adx');
  AvailableIndicators.push('atr');
  AvailableIndicators.push('truerange');
  AvailableIndicators.push('roc');
  AvailableIndicators.push('kst');
  AvailableIndicators.push('psar');
  AvailableIndicators.push('stochastic');
  AvailableIndicators.push('williamsr');
  AvailableIndicators.push('adl');
  AvailableIndicators.push('obv');
  AvailableIndicators.push('trix');

  AvailableIndicators.push('cci');
  AvailableIndicators.push('forceindex');
  AvailableIndicators.push('vwap');
  AvailableIndicators.push('renko');
  AvailableIndicators.push('heikinashi');

  AvailableIndicators.push('stochasticrsi');
  AvailableIndicators.push('mfi');

  AvailableIndicators.push('averagegain');
  AvailableIndicators.push('averageloss');
  AvailableIndicators.push('sd');
  AvailableIndicators.push('bullish');
  AvailableIndicators.push('bearish');
  AvailableIndicators.push('abandonedbaby');
  AvailableIndicators.push('doji');
  AvailableIndicators.push('bearishengulfingpattern');
  AvailableIndicators.push('bullishengulfingpattern');
  AvailableIndicators.push('darkcloudcover');
  AvailableIndicators.push('downsidetasukigap');
  AvailableIndicators.push('dragonflydoji');
  AvailableIndicators.push('gravestonedoji');
  AvailableIndicators.push('bullishharami');
  AvailableIndicators.push('bearishharami');
  AvailableIndicators.push('bullishharamicross');
  AvailableIndicators.push('bearishharamicross');
  AvailableIndicators.push('eveningdojistar');
  AvailableIndicators.push('eveningstar');
  AvailableIndicators.push('morningdojistar');
  AvailableIndicators.push('morningstar');
  AvailableIndicators.push('bullishmarubozu');
  AvailableIndicators.push('bearishmarubozu');
  AvailableIndicators.push('piercingline');
  AvailableIndicators.push('bullishspinningtop');
  AvailableIndicators.push('bearishspinningtop');
  AvailableIndicators.push('threeblackcrows');
  AvailableIndicators.push('threewhitesoldiers');

  AvailableIndicators.push('predictPattern');
  AvailableIndicators.push('hasDoubleBottom');
  AvailableIndicators.push('hasDoubleTop');
  AvailableIndicators.push('hasHeadAndShoulder');
  AvailableIndicators.push('hasInverseHeadAndShoulder');
  AvailableIndicators.push('isTrendingUp');
  AvailableIndicators.push('isTrendingDown');
  return AvailableIndicators;
}

let AvailableIndicators = getAvailableIndicators();

exports.getAvailableIndicators = getAvailableIndicators;
exports.AvailableIndicators = AvailableIndicators;
exports.CandleData = CandleData;
exports.CandleList = CandleList;
exports.sma = sma;
exports.SMA = SMA;
exports.ema = ema;
exports.EMA = EMA;
exports.wma = wma;
exports.WMA = WMA;
exports.wema = wema;
exports.WEMA = WEMA;
exports.macd = macd;
exports.MACD = MACD;
exports.rsi = rsi;
exports.RSI = RSI;
exports.bollingerbands = bollingerbands;
exports.BollingerBands = BollingerBands;
exports.adx = adx;
exports.ADX = ADX;
exports.atr = atr;
exports.ATR = ATR;
exports.truerange = truerange;
exports.TrueRange = TrueRange;
exports.roc = roc;
exports.ROC = ROC;
exports.kst = kst;
exports.KST = KST;
exports.psar = psar;
exports.PSAR = PSAR;
exports.stochastic = stochastic;
exports.Stochastic = Stochastic;
exports.williamsr = williamsr;
exports.WilliamsR = WilliamsR;
exports.adl = adl;
exports.ADL = ADL;
exports.obv = obv;
exports.OBV = OBV;
exports.trix = trix;
exports.TRIX = TRIX;
exports.forceindex = forceindex;
exports.ForceIndex = ForceIndex;
exports.cci = cci;
exports.CCI = CCI;
exports.vwap = vwap;
exports.VWAP = VWAP;
exports.mfi = mfi;
exports.MFI = MFI;
exports.stochasticrsi = stochasticrsi;
exports.StochasticRSI = StochasticRSI;
exports.averagegain = averagegain;
exports.AverageGain = AverageGain;
exports.averageloss = averageloss;
exports.AverageLoss = AverageLoss;
exports.sd = sd;
exports.SD = SD;
exports.renko = renko;
exports.HeikinAshi = HeikinAshi;
exports.heikinashi = heikinashi;
exports.bullish = bullish;
exports.bearish = bearish;
exports.abandonedbaby = abandonedbaby;
exports.doji = doji;
exports.bearishengulfingpattern = bearishengulfingpattern;
exports.bullishengulfingpattern = bullishengulfingpattern;
exports.darkcloudcover = darkcloudcover;
exports.downsidetasukigap = downsidetasukigap;
exports.dragonflydoji = dragonflydoji;
exports.gravestonedoji = gravestonedoji;
exports.bullishharami = bullishharami;
exports.bearishharami = bearishharami;
exports.bullishharamicross = bullishharamicross;
exports.bearishharamicross = bearishharamicross;
exports.eveningdojistar = eveningdojistar;
exports.eveningstar = eveningstar;
exports.morningdojistar = morningdojistar;
exports.morningstar = morningstar;
exports.bullishmarubozu = bullishmarubozu;
exports.bearishmarubozu = bearishmarubozu;
exports.piercingline = piercingline;
exports.bullishspinningtop = bullishspinningtop;
exports.bearishspinningtop = bearishspinningtop;
exports.threeblackcrows = threeblackcrows;
exports.threewhitesoldiers = threewhitesoldiers;
exports.fibonacciretracement = fibonacciretracement;
exports.predictPattern = predictPattern;
exports.PatternDetector = PatternDetector;
exports.hasDoubleBottom = hasDoubleBottom;
exports.hasDoubleTop = hasDoubleTop;
exports.hasHeadAndShoulder = hasHeadAndShoulder;
exports.hasInverseHeadAndShoulder = hasInverseHeadAndShoulder;
exports.isTrendingUp = isTrendingUp;
exports.isTrendingDown = isTrendingDown;
exports.setConfig = setConfig;
exports.getConfig = getConfig;
//# sourceMappingURL=index.js.map
