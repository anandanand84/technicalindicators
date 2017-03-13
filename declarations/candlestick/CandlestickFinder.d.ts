import StockData from '../StockData';
export default class CandlestickFinder {
    requiredCount: number;
    name: string;
    constructor();
    approximateEqual(a: number, b: number): boolean;
    logic(data: StockData): boolean;
    getAllPatternIndex(data: StockData): number[];
    hasPattern(data: StockData): any;
    protected _getLastDataForCandleStick(data: StockData): StockData;
    protected _generateDataForCandleStick(data: StockData): StockData[];
}
