export declare enum CounterpartyType {
    BANK = "BANK",
    CORPORATE = "CORPORATE",
    HEDGE_FUND = "HEDGE_FUND",
    PENSION_FUND = "PENSION_FUND"
}
export declare class Counterparty {
    id: string;
    reference: string;
    referential: string;
    name: string;
    country: string;
    city: string;
    type: CounterpartyType;
    creditRating: string;
    lei: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
