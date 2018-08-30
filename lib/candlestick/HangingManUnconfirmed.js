import HangingMan from './HangingMan';
export default class HangingManUnconfirmed extends HangingMan {
    constructor() {
        super();
        this.name = 'HangingManUnconfirmed';
    }
    logic(data) {
        let isPattern = this.upwardTrend(data, false);
        isPattern = isPattern && this.includesHammer(data, false);
        return isPattern;
    }
}
export function hangingmanunconfirmed(data) {
    return new HangingManUnconfirmed().hasPattern(data);
}
