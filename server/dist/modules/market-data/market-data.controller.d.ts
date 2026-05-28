import { MarketDataService } from './market-data.service';
export declare class MarketDataController {
    private readonly service;
    constructor(service: MarketDataService);
    getFxRates(date?: string): Promise<import("./market-data.entity").MarketData[]>;
    getRates(date?: string): Promise<import("./market-data.entity").MarketData[]>;
    getCreditSpreads(date?: string): Promise<import("./market-data.entity").MarketData[]>;
    getBondPrices(date?: string): Promise<import("./market-data.entity").MarketData[]>;
    findByTicker(ticker: string): Promise<import("./market-data.entity").MarketData[]>;
    findAll(date?: string): Promise<import("./market-data.entity").MarketData[]>;
}
