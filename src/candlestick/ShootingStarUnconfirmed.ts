import StockData from '../StockData';
import ShootingStar from './ShootingStar';

export default class ShootingStarUnconfirmed extends ShootingStar {
    constructor() {
        super();
        this.name = 'ShootingStarUnconfirmed';
    }

    logic (data:StockData) {
        let isPattern = this.upwardTrend(data, false);
        isPattern = isPattern && this.includesHammer(data, false);
        return isPattern;
    }
}

export function shootingstarunconfirmed(data:StockData) {
  return new ShootingStarUnconfirmed().hasPattern(data);
}
