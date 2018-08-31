import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishInvertedHammer extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bearishinvertedhammer(data: StockData): any;
