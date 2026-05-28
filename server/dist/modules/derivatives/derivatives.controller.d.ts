import { DerivativesService } from './derivatives.service';
export declare class DerivativesController {
    private readonly service;
    constructor(service: DerivativesService);
    findAll(type?: string, page?: number, limit?: number): Promise<{
        items: import("../trades/trade.entity").Trade[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("../trades/trade.entity").Trade>;
}
