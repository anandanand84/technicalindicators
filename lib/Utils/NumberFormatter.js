import { getConfig } from '../config';
export function format(v) {
    let precision = getConfig('precision');
    if (precision) {
        return parseFloat(v.toPrecision(precision));
    }
    return v;
}
