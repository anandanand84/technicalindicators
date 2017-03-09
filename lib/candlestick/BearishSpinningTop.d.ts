import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishSpinningTop extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bearishspinningtop(data: StockData): any;
