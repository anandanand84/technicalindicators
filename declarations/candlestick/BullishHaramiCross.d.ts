import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BullishHaramiCross extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bullishharamicross(data: StockData): any;
