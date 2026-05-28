"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterpartiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const counterparty_entity_1 = require("./counterparty.entity");
const legal_entity_entity_1 = require("./legal-entity.entity");
const trader_entity_1 = require("./trader.entity");
let CounterpartiesService = class CounterpartiesService {
    constructor(counterpartyRepo, legalEntityRepo, traderRepo) {
        this.counterpartyRepo = counterpartyRepo;
        this.legalEntityRepo = legalEntityRepo;
        this.traderRepo = traderRepo;
    }
    findAllCounterparties(filter) {
        const qb = this.counterpartyRepo
            .createQueryBuilder('c')
            .where('c.active = true');
        if (filter.type)
            qb.andWhere('c.type = :type', { type: filter.type });
        return qb.orderBy('c.name').getMany();
    }
    async findCounterpartyById(id) {
        const counterparty = await this.counterpartyRepo.findOneBy({ id });
        if (!counterparty)
            throw new common_1.NotFoundException(`Contrepartie ${id} introuvable`);
        return counterparty;
    }
    findAllLegalEntities() {
        return this.legalEntityRepo.find({
            where: { active: true },
            order: { name: 'ASC' },
        });
    }
    async findLegalEntityById(id) {
        const entity = await this.legalEntityRepo.findOneBy({ id });
        if (!entity)
            throw new common_1.NotFoundException(`Entité légale ${id} introuvable`);
        return entity;
    }
    findAllTraders(filter) {
        const qb = this.traderRepo
            .createQueryBuilder('t')
            .where('t.active = true');
        if (filter.desk)
            qb.andWhere('t.desk = :desk', { desk: filter.desk });
        return qb.orderBy('t.lastName').getMany();
    }
    async findTraderById(id) {
        const trader = await this.traderRepo.findOneBy({ id });
        if (!trader)
            throw new common_1.NotFoundException(`Trader ${id} introuvable`);
        return trader;
    }
    getReferenceSources() {
        return [
            { code: 'BBG', name: 'Bloomberg', applicableEntities: ['counterparties', 'legal-entities', 'traders'] },
            { code: 'FIXSESSION', name: 'FIX Session', applicableEntities: ['counterparties'] },
            { code: 'REUTERS', name: 'Reuters', applicableEntities: ['counterparties', 'legal-entities'] },
        ];
    }
};
exports.CounterpartiesService = CounterpartiesService;
exports.CounterpartiesService = CounterpartiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(counterparty_entity_1.Counterparty)),
    __param(1, (0, typeorm_1.InjectRepository)(legal_entity_entity_1.LegalEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(trader_entity_1.Trader)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CounterpartiesService);
//# sourceMappingURL=counterparties.service.js.map