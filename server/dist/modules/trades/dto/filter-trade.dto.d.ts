import { TradeType, TradeStatus } from '../trade.entity';
export declare class FilterTradeDto {
    tradeType?: TradeType;
    status?: TradeStatus;
    desk?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
    page?: number;
    limit?: number;
}
