import { IndicatorInput, Indicator } from '../indicator/indicator';
export declare class StochasticRsiInput extends IndicatorInput {
    values: number[];
    rsiPeriod: number;
    stochasticPeriod: number;
    kPeriod: number;
    dPeriod: number;
}
export declare class StochasticRSIOutput {
    stochRSI: number;
    k: number;
    d: number;
}
export declare class StochasticRSI extends Indicator {
    result: StochasticRSIOutput[];
    generator: IterableIterator<StochasticRSIOutput | undefined>;
    constructor(input: StochasticRsiInput);
    static calculate: typeof stochasticrsi;
    nextValue(input: StochasticRsiInput): StochasticRSIOutput;
}
export declare function stochasticrsi(input: StochasticRsiInput): StochasticRSIOutput[];
