import { Trade } from '../trades/trade.entity';
export declare class FxSwapTrade {
    id: string;
    trade: Trade;
    currencyPair: string;
    direction: string;
    capturedNearAmount: number;
    capturedCurrency: string;
    exchangeRate: number;
    spotMargin: number;
    farExchangeRate: number;
    farMargin: number;
    nearSettlementDate: string;
    farSettlementDate: string;
}
