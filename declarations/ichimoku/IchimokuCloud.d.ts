import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CandleData } from '../StockData';
export declare class IchimokuCloudInput extends IndicatorInput {
    high: number[];
    low: number[];
    conversionPeriod: number;
    basePeriod: number;
    spanPeriod: number;
    displacement: number;
}
export declare class IchimokuCloudOutput {
    conversion: number;
    base: number;
    spanA: number;
    spanB: number;
}
export declare class IchimokuCloud extends Indicator {
    result: IchimokuCloudOutput[];
    generator: IterableIterator<IchimokuCloudOutput | undefined>;
    constructor(input: IchimokuCloudInput);
    static calculate: typeof ichimokucloud;
    nextValue(price: CandleData): IchimokuCloudOutput;
}
export declare function ichimokucloud(input: IchimokuCloudInput): IchimokuCloudOutput[];
