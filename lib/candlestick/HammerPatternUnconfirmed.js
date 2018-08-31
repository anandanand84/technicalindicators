import HammerPattern from './HammerPattern';
export default class HammerPatternUnconfirmed extends HammerPattern {
    constructor() {
        super();
        this.name = 'HammerPatternUnconfirmed';
    }
    logic(data) {
        let isPattern = this.downwardTrend(data, false);
        isPattern = isPattern && this.includesHammer(data, false);
        return isPattern;
    }
}
export function hammerpatternunconfirmed(data) {
    return new HammerPatternUnconfirmed().hasPattern(data);
}
