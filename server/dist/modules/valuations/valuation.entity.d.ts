import { Trade } from '../trades/trade.entity';
export declare class Valuation {
    id: string;
    trade: Trade;
    valuationDate: string;
    mtm: number;
    dayPnl: number;
    totalPnl: number;
    dv01: number;
    accruedInterest: number;
    dirtyPrice: number;
    cleanPrice: number;
    currency: string;
    createdAt: Date;
}
