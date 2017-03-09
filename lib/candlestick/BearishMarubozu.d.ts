import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishMarubozu extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bearishmarubozu(data: StockData): any;
