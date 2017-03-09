import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BullishSpinningTop extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bullishspinningtop(data: StockData): any;
