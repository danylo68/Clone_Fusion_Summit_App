import { FxSwapService } from './fx-swap.service';
export declare class FxSwapController {
    private readonly service;
    constructor(service: FxSwapService);
    findAll(page?: number, limit?: number): Promise<{
        items: import("../trades/trade.entity").Trade[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("../trades/trade.entity").Trade>;
}
