import { Trade } from '../trades/trade.entity';
export declare class DerivativeTrade {
    id: string;
    trade: Trade;
    derivativeType: string;
    notional: number;
    currency: string;
    payLegType: string;
    payRate: number;
    payFrequency: string;
    receiveLegType: string;
    receiveRate: number;
    receiveFrequency: string;
    floatingIndex: string;
    startDate: string;
    maturityDate: string;
    dayCount: string;
}
