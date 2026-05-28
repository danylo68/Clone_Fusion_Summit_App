import { Repository } from 'typeorm';
import { MarketData, InstrumentType } from './market-data.entity';
export declare class MarketDataService {
    private readonly repo;
    constructor(repo: Repository<MarketData>);
    findByType(type: InstrumentType, date?: string): Promise<MarketData[]>;
    findByTicker(ticker: string): Promise<MarketData[]>;
    findAll(date?: string): Promise<MarketData[]>;
}
