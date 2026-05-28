import { Repository } from 'typeorm';
import { Counterparty } from './counterparty.entity';
import { LegalEntity } from './legal-entity.entity';
import { Trader } from './trader.entity';
import { FilterCounterpartyDto } from './dto/filter-counterparty.dto';
export declare class CounterpartiesService {
    private readonly counterpartyRepo;
    private readonly legalEntityRepo;
    private readonly traderRepo;
    constructor(counterpartyRepo: Repository<Counterparty>, legalEntityRepo: Repository<LegalEntity>, traderRepo: Repository<Trader>);
    findAllCounterparties(filter: FilterCounterpartyDto): Promise<Counterparty[]>;
    findCounterpartyById(id: string): Promise<Counterparty>;
    findAllLegalEntities(): Promise<LegalEntity[]>;
    findLegalEntityById(id: string): Promise<LegalEntity>;
    findAllTraders(filter: FilterCounterpartyDto): Promise<Trader[]>;
    findTraderById(id: string): Promise<Trader>;
    getReferenceSources(): {
        code: string;
        name: string;
        applicableEntities: string[];
    }[];
}
