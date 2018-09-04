import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class TweezerBottom extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
    downwardTrend(data: StockData): boolean;
}
export declare function tweezerbottom(data: StockData): any;
