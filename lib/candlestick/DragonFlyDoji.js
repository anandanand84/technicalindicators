import CandlestickFinder from './CandlestickFinder';
export default class DragonFlyDoji extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 1;
        this.name = 'DragonFlyDoji';
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isOpenEqualsClose = this.approximateEqual(daysOpen, daysClose);
        let isHighEqualsOpen = isOpenEqualsClose && this.approximateEqual(daysOpen, daysHigh);
        let isLowEqualsClose = isOpenEqualsClose && this.approximateEqual(daysClose, daysLow);
        return (isOpenEqualsClose && isHighEqualsOpen && !isLowEqualsClose);
    }
}
export function dragonflydoji(data) {
    return new DragonFlyDoji().hasPattern(data);
}
