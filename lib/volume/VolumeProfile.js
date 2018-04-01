import { Indicator, IndicatorInput } from '../indicator/indicator';
export class VolumeProfileInput extends IndicatorInput {
}
export class VolumeProfileOutput {
}
export function priceFallsBetweenBarRange(low, high, low1, high1) {
    return (low <= low1 && high >= low1) || (low1 <= low && high1 >= low);
}
export class VolumeProfile extends Indicator {
    constructor(input) {
        super(input);
        var highs = input.high;
        var lows = input.low;
        var closes = input.close;
        var opens = input.open;
        var volumes = input.volume;
        var bars = input.noOfBars;
        if (!((lows.length === highs.length) && (highs.length === closes.length) && (highs.length === volumes.length))) {
            throw ('Inputs(low,high, close, volumes) not of equal size');
        }
        this.result = [];
        var max = Math.max(...highs, ...lows, ...closes, ...opens);
        var min = Math.min(...highs, ...lows, ...closes, ...opens);
        var barRange = (max - min) / bars;
        var lastEnd = min;
        for (let i = 0; i < bars; i++) {
            let rangeStart = lastEnd;
            let rangeEnd = rangeStart + barRange;
            lastEnd = rangeEnd;
            let bullishVolume = 0;
            let bearishVolume = 0;
            let totalVolume = 0;
            for (let priceBar = 0; priceBar < highs.length; priceBar++) {
                let priceBarStart = lows[priceBar];
                let priceBarEnd = highs[priceBar];
                let priceBarOpen = opens[priceBar];
                let priceBarClose = closes[priceBar];
                let priceBarVolume = volumes[priceBar];
                if (priceFallsBetweenBarRange(rangeStart, rangeEnd, priceBarStart, priceBarEnd)) {
                    totalVolume = totalVolume + priceBarVolume;
                    if (priceBarOpen > priceBarClose) {
                        bearishVolume = bearishVolume + priceBarVolume;
                    }
                    else {
                        bullishVolume = bullishVolume + priceBarVolume;
                    }
                }
            }
            this.result.push({
                rangeStart, rangeEnd, bullishVolume, bearishVolume, totalVolume
            });
        }
    }
    ;
    nextValue(price) {
        throw ('Next value not supported for volume profile');
    }
    ;
}
VolumeProfile.calculate = volumeprofile;
export function volumeprofile(input) {
    Indicator.reverseInputs(input);
    var result = new VolumeProfile(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
