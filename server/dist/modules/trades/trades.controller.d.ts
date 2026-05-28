import { TradesService } from './trades.service';
import { FilterTradeDto } from './dto/filter-trade.dto';
export declare class TradesController {
    private readonly service;
    constructor(service: TradesService);
    getStats(): Promise<{
        total: number;
        byType: any[];
        byStatus: any[];
        byDesk: any[];
    }>;
    findAll(filter: FilterTradeDto): Promise<{
        items: import("./trade.entity").Trade[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("./trade.entity").Trade>;
}
