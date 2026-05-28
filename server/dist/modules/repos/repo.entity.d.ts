import { Trade } from '../trades/trade.entity';
import { Bond } from '../bonds/bond.entity';
export declare class RepoTrade {
    id: string;
    trade: Trade;
    bond: Bond;
    repoType: string;
    notional: number;
    currency: string;
    repoRate: number;
    startDate: string;
    endDate: string;
    haircut: number;
    collateralIsin: string;
}
