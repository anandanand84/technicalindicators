declare class ForceIndexInput extends IndicatorInput {
    close: number[];
    volume: number[];
    period: number;
}
declare class ForceIndex extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: ForceIndexInput);
    static calculate: typeof forceindex;
    nextValue(price: CandleData): number | undefined;
}
declare function forceindex(input: ForceIndexInput): number[];
declare class EMA extends Indicator {
    period: number;
    price: number[];
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: MAInput);
    static calculate: typeof ema;
    nextValue(price: number): number;
}
declare function ema(input: MAInput): number[];
declare class IndicatorInput {
    reversedInput?: boolean;
    format?: (data: number) => number;
}
declare class AllInputs {
    values?: number[];
    open?: number[];
    high?: number[];
    low?: number[];
    close?: number[];
    volume?: number[];
    timestamp?: number[];
}
declare class Indicator {
    result: any;
    format: (data: number) => number;
    constructor(input: IndicatorInput);
    static reverseInputs(input: any): void;
    getResult(): any;
}
declare function format(v: number): number;
declare function setConfig(key: any, value: any): void;
declare function getConfig(key: any): any;
declare class MAInput extends IndicatorInput {
    period: number;
    values: number[];
    constructor(period: number, values: number[]);
}
declare class SMA extends Indicator {
    period: number;
    price: number[];
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: MAInput);
    static calculate: typeof sma;
    nextValue(price: number): number | undefined;
}
declare function sma(input: MAInput): number[];
declare class LinkedList {
    private _head;
    private _tail;
    private _next;
    private _length;
    private _current;
    constructor();
    readonly head: any;
    readonly tail: any;
    readonly current: any;
    readonly length: any;
    push(data: any): void;
    pop(): any;
    shift(): any;
    unshift(data: any): void;
    unshiftCurrent(): any;
    removeCurrent(): any;
    resetCursor(): this;
    next(): any;
}
declare class VWAPInput extends IndicatorInput {
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
}
declare class VWAP extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: VWAPInput);
    static calculate: typeof vwap;
    nextValue(price: CandleData): number | undefined;
}
declare function vwap(input: VWAPInput): number[];
declare class VolumeProfileInput extends IndicatorInput {
    high: number[];
    open: number[];
    low: number[];
    close: number[];
    volume: number[];
    noOfBars: number;
}
declare class VolumeProfileOutput {
    rangeStart: number;
    rangeEnd: number;
    bullishVolume: number;
    bearishVolume: number;
}
declare function priceFallsBetweenBarRange(low: any, high: any, low1: any, high1: any): boolean;
declare class VolumeProfile extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: VolumeProfileInput);
    static calculate: typeof volumeprofile;
    nextValue(price: CandleData): number | undefined;
}
declare function volumeprofile(input: VolumeProfileInput): number[];
declare class AvgGainInput extends IndicatorInput {
    period: number;
    values: number[];
}
declare class AverageGain extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: AvgGainInput);
    static calculate: typeof averagegain;
    nextValue(price: number): number | undefined;
}
declare function averagegain(input: AvgGainInput): number[];
declare class AvgLossInput extends IndicatorInput {
    values: number[];
    period: number;
}
declare class AverageLoss extends Indicator {
    generator: IterableIterator<number | undefined>;
    constructor(input: AvgLossInput);
    static calculate: typeof averageloss;
    nextValue(price: number): number | undefined;
}
declare function averageloss(input: AvgLossInput): number[];
/**
 * Created by AAravindan on 5/4/16.
 */
declare class RenkoInput extends IndicatorInput {
    period?: number;
    brickSize?: number;
    useATR?: boolean;
    low?: number[];
    open?: number[];
    volume?: number[];
    high?: number[];
    close?: number[];
    timestamp?: number[];
}
declare function renko(input: RenkoInput): CandleList;
 class StockData {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    reversedInput?: boolean;
    constructor(open: number[], high: number[], low: number[], close: number[], reversedInput: boolean);
}
declare class CandleData {
    open?: number;
    high?: number;
    low?: number;
    close?: number;
    timestamp?: number;
    volume?: number;
}
declare class CandleList {
    open?: number[];
    high?: number[];
    low?: number[];
    close?: number[];
    volume?: number[];
    timestamp?: number[];
}
declare class ATRInput extends IndicatorInput {
    low: number[];
    high: number[];
    close: number[];
    period: number;
}
declare class ATR extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: ATRInput);
    static calculate: typeof atr;
    nextValue(price: CandleData): number | undefined;
}
declare function atr(input: ATRInput): number[];
declare class WEMA extends Indicator {
    period: number;
    price: number[];
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: MAInput);
    static calculate: typeof wema;
    nextValue(price: number): number | undefined;
}
declare function wema(input: MAInput): number[];
declare class TrueRangeInput extends IndicatorInput {
    low: number[];
    high: number[];
    close: number[];
}
declare class TrueRange extends Indicator {
    result: number[];
    generator: IterableIterator<number | undefined>;
    constructor(input: TrueRangeInput);
    static calculate: typeof truerange;
    nextValue(price: CandleData): number | undefined;
}
declare function truerange(input: TrueRangeInput): number[];
/**
 * Created by AAravindan on 5/4/16.
 */
declare class HeikinAshiInput extends IndicatorInput {
    low?: number[];
    open?: number[];
    volume?: number[];
    high?: number[];
    close?: number[];
    timestamp?: number[];
}
declare class HeikinAshi extends Indicator {
    result: CandleList;
    generator: IterableIterator<CandleData | undefined>;
    constructor(input: HeikinAshiInput);
    static calculate: typeof heikinashi;
    nextValue(price: CandleData): CandleData | undefined;
}
declare function heikinashi(input: HeikinAshiInput): CandleList;
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
declare function fibonacciretracement(start: number, end: number): number[];
declare class IchimokuCloudInput extends IndicatorInput {
    high: number[];
    low: number[];
    conversionPeriod: number;
    basePeriod: number;
    spanPeriod: number;
    displacement: number;
}
declare class IchimokuCloudOutput {
    conversion: number;
    base: number;
    spanA: number;
    spanB: number;
}
declare class IchimokuCloud extends Indicator {
    result: IchimokuCloudOutput[];
    generator: IterableIterator<IchimokuCloudOutput | undefined>;
    constructor(input: IchimokuCloudInput);
    static calculate: typeof ichimokucloud;
    nextValue(price: CandleData): IchimokuCloudOutput;
}
declare function ichimokucloud(input: IchimokuCloudInput): IchimokuCloudOutput[];
/**
 * Created by AAravindan on 5/7/16.
 */
 class FixedSizeLinkedList extends LinkedList {
    size: number;
    maintainHigh?: boolean;
    maintainLow?: boolean;
    maintainSum?: boolean;
    totalPushed: number;
    periodHigh: number;
    periodLow: number;
    periodSum: number;
    lastShift: number;
    _push: (data: number) => void;
    constructor(size: number, maintainHigh?: boolean, maintainLow?: boolean, maintainSum?: boolean);
    add(data: number): void;
    iterator(): IterableIterator<any>;
    calculatePeriodHigh(): void;
    calculatePeriodLow(): void;
}
declare class KeltnerChannelsInput extends IndicatorInput {
    maPeriod: number;
    atrPeriod: number;
    useSMA: boolean;
    multiplier: number;
    high: number[];
    low: number[];
    close: number[];
}
declare class KeltnerChannelsOutput extends IndicatorInput {
    middle: number;
    upper: number;
    lower: number;
}
declare class KeltnerChannels extends Indicator {
    result: KeltnerChannelsOutput[];
    generator: IterableIterator<KeltnerChannelsOutput | undefined>;
    constructor(input: KeltnerChannelsInput);
    static calculate: typeof keltnerchannels;
    nextValue(price: KeltnerChannelsInput): KeltnerChannelsOutput | undefined;
}
declare function keltnerchannels(input: KeltnerChannelsInput): KeltnerChannelsOutput[];
declare class ChandelierExitInput extends IndicatorInput {
    period: number;
    multiplier: number;
    high: number[];
    low: number[];
    close: number[];
}
declare class ChandelierExitOutput extends IndicatorInput {
    exitLong: number;
    exitShort: number;
}
declare class ChandelierExit extends Indicator {
    generator: IterableIterator<ChandelierExitOutput | undefined>;
    constructor(input: ChandelierExitInput);
    static calculate: typeof chandelierexit;
    nextValue(price: ChandelierExitInput): ChandelierExitOutput | undefined;
}
declare function chandelierexit(input: ChandelierExitInput): number[];
