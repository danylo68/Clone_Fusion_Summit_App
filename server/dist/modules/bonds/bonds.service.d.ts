import { Repository } from 'typeorm';
import { Bond } from './bond.entity';
import { FilterBondDto } from './dto/filter-bond.dto';
export declare class BondsService {
    private readonly repo;
    constructor(repo: Repository<Bond>);
    findAll(filter: FilterBondDto): Promise<Bond[]>;
    findById(id: string): Promise<Bond>;
    findByIsin(isin: string): Promise<Bond>;
}
