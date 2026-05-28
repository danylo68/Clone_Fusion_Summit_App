import { Repository } from 'typeorm';
import { Trade } from '../trades/trade.entity';
export declare class CdsService {
    private readonly repo;
    constructor(repo: Repository<Trade>);
    findAll(page?: number, limit?: number): Promise<{
        items: Trade[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<Trade>;
}
