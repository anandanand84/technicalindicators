import CandlestickFinder from './CandlestickFinder';
export default class BullishInvertedHammerStick extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BullishInvertedHammerStick';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isBullishInvertedHammer = daysClose > daysOpen;
        isBullishInvertedHammer = isBullishInvertedHammer && this.approximateEqual(daysOpen, daysLow);
        isBullishInvertedHammer = isBullishInvertedHammer && (daysClose - daysOpen) <= 2 * (daysHigh - daysClose);
        return isBullishInvertedHammer;
    }
}
export function bullishinvertedhammerstick(data) {
    return new BullishInvertedHammerStick().hasPattern(data);
}
