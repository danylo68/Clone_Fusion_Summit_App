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
exports.ValuationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const valuation_entity_1 = require("./valuation.entity");
let ValuationsService = class ValuationsService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll(filter) {
        const date = filter.date || new Date().toISOString().split('T')[0];
        return this.repo
            .createQueryBuilder('v')
            .leftJoinAndSelect('v.trade', 'trade')
            .leftJoinAndSelect('trade.counterparty', 'counterparty')
            .where('v.valuationDate = :date', { date })
            .orderBy('v.mtm', 'DESC')
            .getMany();
    }
    async getPortfolioSummary() {
        const date = new Date().toISOString().split('T')[0];
        return this.repo
            .createQueryBuilder('v')
            .select('SUM(v.mtm)', 'totalMtm')
            .addSelect('SUM(v.dayPnl)', 'totalDayPnl')
            .addSelect('SUM(v.totalPnl)', 'totalPnl')
            .addSelect('SUM(v.dv01)', 'totalDv01')
            .addSelect('SUM(v.accruedInterest)', 'totalAccrued')
            .where('v.valuationDate = :date', { date })
            .getRawOne();
    }
    findByTrade(tradeId) {
        return this.repo.find({
            where: { trade: { id: tradeId } },
            order: { valuationDate: 'DESC' },
        });
    }
};
exports.ValuationsService = ValuationsService;
exports.ValuationsService = ValuationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(valuation_entity_1.Valuation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ValuationsService);
//# sourceMappingURL=valuations.service.js.map