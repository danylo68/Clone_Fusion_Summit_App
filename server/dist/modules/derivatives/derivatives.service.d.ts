import { Repository } from 'typeorm';
import { Trade } from '../trades/trade.entity';
export declare class DerivativesService {
    private readonly repo;
    constructor(repo: Repository<Trade>);
    findAll(type?: string, page?: number, limit?: number): Promise<{
        items: Trade[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<Trade>;
}
