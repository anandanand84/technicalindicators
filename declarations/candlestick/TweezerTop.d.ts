import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class TweezerTop extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
    upwardTrend(data: StockData): boolean;
}
export declare function tweezertop(data: StockData): any;
