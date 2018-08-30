import StockData from '../StockData';
import HammerPattern from './HammerPattern';

export default class HammerPatternUnconfirmed extends HammerPattern {
    constructor() {
        super();
        this.name = 'HammerPatternUnconfirmed';
    }

    logic (data:StockData) {
        let isPattern = this.downwardTrend(data, false);
        isPattern = isPattern && this.includesHammer(data, false);
        return isPattern;
   }
}

export function hammerpatternunconfirmed(data:StockData) {
  return new HammerPatternUnconfirmed().hasPattern(data);
}
