import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class DragonFlyDoji extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function dragonflydoji(data: StockData): any;
