import { BondsService } from './bonds.service';
import { FilterBondDto } from './dto/filter-bond.dto';
export declare class BondsController {
    private readonly service;
    constructor(service: BondsService);
    findAll(filter: FilterBondDto): Promise<import("./bond.entity").Bond[]>;
    findByIsin(isin: string): Promise<import("./bond.entity").Bond>;
    findOne(id: string): Promise<import("./bond.entity").Bond>;
}
