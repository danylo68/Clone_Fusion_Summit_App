import { FxSpotService } from './fx-spot.service';
export declare class FxSpotController {
    private readonly service;
    constructor(service: FxSpotService);
    findAll(ref?: string, page?: number, limit?: number): Promise<{
        items: import("../trades/trade.entity").Trade[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("../trades/trade.entity").Trade>;
}
