import { Indicator, IndicatorInput } from '../indicator/indicator';
export declare class PatternDetectorInput extends IndicatorInput {
    values: number[];
    constructor(values: number[]);
}
export declare enum AvailablePatterns {
    'IHS' = 0,
    'TU' = 1,
    'DB' = 2,
    'HS' = 3,
    'TD' = 4,
    'DT' = 5
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
