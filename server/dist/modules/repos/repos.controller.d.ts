import { ReposService } from './repos.service';
export declare class ReposController {
    private readonly service;
    constructor(service: ReposService);
    findAll(page?: number, limit?: number): Promise<{
        items: import("../trades/trade.entity").Trade[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("../trades/trade.entity").Trade>;
}
