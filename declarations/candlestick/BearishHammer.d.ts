import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishHammer extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bearishhammer(data: StockData): any;
