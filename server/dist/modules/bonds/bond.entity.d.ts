export declare enum CouponFrequency {
    ANNUAL = "ANNUAL",
    SEMI_ANNUAL = "SEMI_ANNUAL",
    QUARTERLY = "QUARTERLY"
}
export declare enum BondType {
    FIXED = "FIXED",
    FLOATING = "FLOATING",
    ZERO_COUPON = "ZERO_COUPON"
}
export declare class Bond {
    id: string;
    isin: string;
    ticker: string;
    issuer: string;
    currency: string;
    faceValue: number;
    couponRate: number;
    couponFrequency: CouponFrequency;
    issueDate: string;
    maturityDate: string;
    rating: string;
    country: string;
    sector: string;
    type: BondType;
    active: boolean;
    createdAt: Date;
}
