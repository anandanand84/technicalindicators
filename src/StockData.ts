export default class StockData {
    reversedInput?:boolean
    constructor(public open:number[], public high:number[], public low:number[], public close:number[], reversedInput:boolean) {
        this.reversedInput = reversedInput;
    }
}