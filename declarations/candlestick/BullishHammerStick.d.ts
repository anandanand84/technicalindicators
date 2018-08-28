import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BullishHammerStick extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bullishhammerstick(data: StockData): any;
