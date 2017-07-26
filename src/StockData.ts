export default class StockData {
    reversedInput?:boolean
    constructor(public open:number[], public high:number[], public low:number[], public close:number[], reversedInput:boolean) {
        this.reversedInput = reversedInput;
    }
}

export class CandleData {
    open?:number;
    high?:number;
    low?:number;
    close?:number
    timestamp?:number
    volume?:number
}

export class CandleList {
    open?:number[] = [];
    high?:number[] = [];
    low?:number[] = [];
    close?:number[] = []
    volume?: number[] = []
    timestamp? : number[] = []
}