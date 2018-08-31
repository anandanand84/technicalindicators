import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BullishHammer extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bullishhammer(data: StockData): any;
