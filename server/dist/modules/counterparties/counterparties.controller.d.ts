import { CounterpartiesService } from './counterparties.service';
import { FilterCounterpartyDto } from './dto/filter-counterparty.dto';
export declare class CounterpartiesController {
    private readonly service;
    constructor(service: CounterpartiesService);
    findAll(filter: FilterCounterpartyDto): Promise<import("./counterparty.entity").Counterparty[]>;
    findAllLegalEntities(): Promise<import("./legal-entity.entity").LegalEntity[]>;
    findAllTraders(filter: FilterCounterpartyDto): Promise<import("./trader.entity").Trader[]>;
    getReferenceSources(): {
        code: string;
        name: string;
        applicableEntities: string[];
    }[];
    findOne(id: string): Promise<import("./counterparty.entity").Counterparty>;
    findOneLegalEntity(id: string): Promise<import("./legal-entity.entity").LegalEntity>;
    findOneTrader(id: string): Promise<import("./trader.entity").Trader>;
}
