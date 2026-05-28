import { Repository } from 'typeorm';
import { Valuation } from './valuation.entity';
import { FilterValuationDto } from './dto/filter-valuation.dto';
export declare class ValuationsService {
    private readonly repo;
    constructor(repo: Repository<Valuation>);
    findAll(filter: FilterValuationDto): Promise<Valuation[]>;
    getPortfolioSummary(): Promise<any>;
    findByTrade(tradeId: string): Promise<Valuation[]>;
}
