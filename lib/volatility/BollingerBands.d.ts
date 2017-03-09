import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class BollingerBandsInput extends IndicatorInput {
    period: number;
    stdDev: number;
    values: number[];
}
export declare class BollingerBandsOutput extends IndicatorInput {
    middle: number;
    upper: number;
    lower: number;
    pb: number;
}
export declare class BollingerBands extends Indicator {
    generator: IterableIterator<BollingerBandsOutput | undefined>;
    constructor(input: BollingerBandsInput);
    static calculate: typeof bollingerbands;
    nextValue(price: number): BollingerBandsOutput | undefined;
}
export declare function bollingerbands(input: BollingerBandsInput): BollingerBandsOutput[];
