import { Counterparty } from '../counterparties/counterparty.entity';
import { LegalEntity } from '../counterparties/legal-entity.entity';
import { Trader } from '../counterparties/trader.entity';
import { Bond } from '../bonds/bond.entity';
export declare enum TradeType {
    FX_SPOT = "FX_SPOT",
    FX_SWAP = "FX_SWAP",
    BOND = "BOND",
    REPO = "REPO",
    CDS = "CDS",
    IRS = "IRS",
    CCS = "CCS"
}
export declare enum TradeStatus {
    NEW = "NEW",
    CONFIRMED = "CONFIRMED",
    SETTLED = "SETTLED",
    CANCELLED = "CANCELLED",
    AMENDED = "AMENDED"
}
export declare enum TradeDirection {
    BUY = "BUY",
    SELL = "SELL"
}
export declare class Trade {
    id: string;
    tradeRef: string;
    tradeType: TradeType;
    status: TradeStatus;
    direction: TradeDirection;
    tradeDate: string;
    valueDate: string;
    maturityDate: string;
    notional: number;
    notionalCurrency: string;
    price: number;
    yield: number;
    currencyPair: string;
    exchangeRate: number;
    capturedAmount: number;
    capturedCurrency: string;
    desk: string;
    comments: string;
    counterparty: Counterparty;
    legalEntity: LegalEntity;
    trader: Trader;
    bond: Bond;
    createdAt: Date;
    updatedAt: Date;
}
