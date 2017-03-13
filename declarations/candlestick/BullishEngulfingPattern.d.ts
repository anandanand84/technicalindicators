import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BullishEngulfingPattern extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bullishengulfingpattern(data: StockData): any;
