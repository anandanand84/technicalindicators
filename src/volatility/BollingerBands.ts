"use strict";
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { SMA } from '../moving_averages/SMA';
import { EMA } from '../moving_averages/EMA';
import { SD } from '../Utils/SD';

export class BollingerBandsInput extends IndicatorInput {
    // Number of values to consider for the moving average and standard deviation. Typically 20.
    period: number;
    // How many standard deviations between the bands and the moving average. Typically 2.
    stdDev: number;
    // Whether to use Exponential Moving Average, or Simple Moving Average to calculate the mean.
    useEMA: boolean;
    // Initial values
    values: number[];
}

export class BollingerBandsOutput extends IndicatorInput {
    middle: number;
    upper: number;
    lower: number;
    // Percent bandwidth
    pb: number;
}

export class BollingerBands extends Indicator {
    generator: IterableIterator<BollingerBandsOutput | undefined>;
    public result = [];

    constructor(input: BollingerBandsInput) {
        super(input);
        const period     = input.period;
        const priceArray = input.values;
        const stdDev     = input.stdDev;
        const format     = this.format;

        const maType = input.useEMA ? EMA : SMA;
        const ma = new maType({ period, values: [], format: v => v });
        const sd = new SD({ period, values: [], format: v => v });

        this.generator = (function* () {
            let result;
            let tick;
            let calcMA;
            let calcSD;
            tick = yield;
            while (true) {
                calcMA = ma.nextValue(tick);
                calcSD = sd.nextValue(tick);
                if (calcMA) {
                    const middle = format(calcMA);
                    const upper = format(calcMA + (calcSD * stdDev));
                    const lower = format(calcMA - (calcSD * stdDev));
                    const pb: number = format((tick - lower) / (upper - lower));
                    result = {
                        middle,
                        upper,
                        lower,
                        pb,
                    };
                }
                tick = yield result;
            }
        })();

        this.generator.next();

        priceArray.forEach(tick => {
            const result = this.generator.next(tick);
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }

    static calculate = bollingerbands;

    nextValue(price: number): BollingerBandsOutput | undefined {
        return this.generator.next(price).value;
    }
}

export function bollingerbands(input: BollingerBandsInput): BollingerBandsOutput[] {
    Indicator.reverseInputs(input);
    const result = new BollingerBands(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
