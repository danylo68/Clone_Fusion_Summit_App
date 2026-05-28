import { CdsService } from './cds.service';
export declare class CdsController {
    private readonly service;
    constructor(service: CdsService);
    findAll(page?: number, limit?: number): Promise<{
        items: import("../trades/trade.entity").Trade[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("../trades/trade.entity").Trade>;
}
