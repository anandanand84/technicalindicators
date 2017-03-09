import { format as nf } from '../Utils/NumberFormatter';

export class IndicatorInput {
    reversedInput?:boolean;
    values?:number[]   
    open?:number[]   
    high?:number[]   
    low?:number[]   
    close?:number[]   
    volume?:number[]
    format?:(data:number)=>number   
}

export class Indicator {
    result:any[];
    format:(data:number)=>number;
    constructor(input:IndicatorInput) {
        this.format = input.format || nf;
    }
    static reverseInputs(input:IndicatorInput):void {
        if(input.reversedInput) {
            input.values ? input.values.reverse() : undefined;
            input.open ? input.open.reverse() : undefined;
            input.high ? input.high.reverse() : undefined;
            input.low ? input.low.reverse() : undefined;
            input.close ? input.close.reverse() : undefined;
            input.volume ? input.volume.reverse() : undefined;
        }
    }

    getResult() {
        return this.result;
    }
}
