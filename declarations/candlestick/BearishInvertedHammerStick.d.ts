import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishInvertedHammerStick extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bearishinvertedhammerstick(data: StockData): any;
