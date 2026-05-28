export declare enum InstrumentType {
    FX = "FX",
    RATE = "RATE",
    CREDIT_SPREAD = "CREDIT_SPREAD",
    BOND_PRICE = "BOND_PRICE"
}
export declare class MarketData {
    id: string;
    instrumentType: InstrumentType;
    ticker: string;
    value: number;
    currency: string;
    tenor: string;
    asOfDate: string;
    source: string;
    createdAt: Date;
}
