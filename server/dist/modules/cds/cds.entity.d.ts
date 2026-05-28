import { Trade } from '../trades/trade.entity';
export declare class CdsTrade {
    id: string;
    trade: Trade;
    referenceEntity: string;
    referenceObligationIsin: string;
    notional: number;
    currency: string;
    spreadBps: number;
    premiumLeg: string;
    startDate: string;
    maturityDate: string;
    restructuringType: string;
    recoveryRate: number;
}
