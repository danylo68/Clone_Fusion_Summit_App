import { Trade } from '../trades/trade.entity';
export declare class FxSpotTrade {
    id: string;
    trade: Trade;
    currencyPair: string;
    direction: string;
    capturedAmount: number;
    capturedCurrency: string;
    exchangeRate: number;
    settlementDate: string;
}
