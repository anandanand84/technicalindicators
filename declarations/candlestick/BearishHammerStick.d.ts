import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishHammerStick extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bearishhammerstick(data: StockData): any;
