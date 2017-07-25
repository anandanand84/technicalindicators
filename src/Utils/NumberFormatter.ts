import { getConfig } from '../config';
export function format(v:number):number {
    let precision:number = getConfig('precision');
    if(precision) {
        return parseFloat(v.toPrecision(precision));
    }
    return v;
}