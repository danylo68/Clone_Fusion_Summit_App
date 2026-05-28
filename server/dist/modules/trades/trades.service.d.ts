import { Repository } from 'typeorm';
import { Trade } from './trade.entity';
import { FilterTradeDto } from './dto/filter-trade.dto';
export declare class TradesService {
    private readonly repo;
    constructor(repo: Repository<Trade>);
    findAll(filter: FilterTradeDto): Promise<{
        items: Trade[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findById(id: string): Promise<Trade>;
    getStats(): Promise<{
        total: number;
        byType: any[];
        byStatus: any[];
        byDesk: any[];
    }>;
}
