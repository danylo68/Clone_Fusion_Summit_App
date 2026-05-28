import { ValuationsService } from './valuations.service';
import { FilterValuationDto } from './dto/filter-valuation.dto';
export declare class ValuationsController {
    private readonly service;
    constructor(service: ValuationsService);
    getPortfolio(): Promise<any>;
    findByTrade(tradeId: string): Promise<import("./valuation.entity").Valuation[]>;
    findAll(filter: FilterValuationDto): Promise<import("./valuation.entity").Valuation[]>;
}
