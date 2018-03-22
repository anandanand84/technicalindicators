import CandlestickFinder from './CandlestickFinder';
export default class Doji extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Doji';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        return this.approximateEqual(daysOpen, daysClose);
    }
}
export function doji(data) {
    return new Doji().hasPattern(data);
}
