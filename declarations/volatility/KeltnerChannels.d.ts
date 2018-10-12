import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class KeltnerChannelsInput extends IndicatorInput {
    maPeriod: number;
    atrPeriod: number;
    useSMA: boolean;
    multiplier: number;
    high: number[];
    low: number[];
    close: number[];
}
export declare class KeltnerChannelsOutput extends IndicatorInput {
    middle: number;
    upper: number;
    lower: number;
}
export declare class KeltnerChannels extends Indicator {
    result: KeltnerChannelsOutput[];
    generator: IterableIterator<KeltnerChannelsOutput | undefined>;
    constructor(input: KeltnerChannelsInput);
    static calculate: typeof keltnerchannels;
    nextValue(price: KeltnerChannelsInput): KeltnerChannelsOutput | undefined;
}
export declare function keltnerchannels(input: KeltnerChannelsInput): KeltnerChannelsOutput[];
