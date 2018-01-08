import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class PatternDetectorInput extends IndicatorInput {
    values: number[];
    constructor(values: number[]);
}
export declare enum AvailablePatterns {
    'TD' = 0,
    'IHS' = 1,
    'HS' = 2,
    'TU' = 3,
    'DT' = 4,
    'DB' = 5,
}
export declare class PatternDetectorOutput {
    patternId: AvailablePatterns;
    pattern: string;
    probability: number;
}
export declare function predictPattern(input: PatternDetectorInput): Promise<PatternDetectorOutput>;
export declare function hasDoubleBottom(input: PatternDetectorInput): Promise<Boolean>;
export declare function hasDoubleTop(input: PatternDetectorInput): Promise<Boolean>;
export declare function hasHeadAndShoulder(input: PatternDetectorInput): Promise<Boolean>;
export declare function hasInverseHeadAndShoulder(input: PatternDetectorInput): Promise<Boolean>;
export declare function isTrendingUp(input: PatternDetectorInput): Promise<Boolean>;
export declare function isTrendingDown(input: PatternDetectorInput): Promise<Boolean>;
export declare class PatternDetector extends Indicator {
    static predictPattern: typeof predictPattern;
    static hasDoubleBottom: typeof hasDoubleBottom;
    static hasDoubleTop: typeof hasDoubleTop;
    static hasHeadAndShoulder: typeof hasHeadAndShoulder;
    static hasInverseHeadAndShoulder: typeof hasInverseHeadAndShoulder;
    static isTrendingUp: typeof isTrendingUp;
    static isTrendingDown: typeof isTrendingDown;
}
