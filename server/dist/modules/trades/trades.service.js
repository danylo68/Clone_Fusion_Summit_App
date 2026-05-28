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
exports.TradesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trade_entity_1 = require("./trade.entity");
let TradesService = class TradesService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(filter) {
        const { page = 1, limit = 50, tradeType, status, desk, dateFrom, dateTo, search } = filter;
        const qb = this.repo
            .createQueryBuilder('trade')
            .leftJoinAndSelect('trade.counterparty', 'counterparty')
            .leftJoinAndSelect('trade.legalEntity', 'legalEntity')
            .leftJoinAndSelect('trade.trader', 'trader')
            .leftJoinAndSelect('trade.bond', 'bond');
        if (tradeType)
            qb.andWhere('trade.tradeType = :tradeType', { tradeType });
        if (status)
            qb.andWhere('trade.status = :status', { status });
        if (desk)
            qb.andWhere('trade.desk = :desk', { desk });
        if (dateFrom)
            qb.andWhere('trade.tradeDate >= :dateFrom', { dateFrom });
        if (dateTo)
            qb.andWhere('trade.tradeDate <= :dateTo', { dateTo });
        if (search) {
            qb.andWhere('(trade.tradeRef ILIKE :s OR counterparty.name ILIKE :s OR trade.currencyPair ILIKE :s)', { s: `%${search}%` });
        }
        qb.orderBy('trade.tradeDate', 'DESC')
            .skip((page - 1) * limit)
            .take(Number(limit));
        const [items, total] = await qb.getManyAndCount();
        return {
            items,
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / limit),
        };
    }
    async findById(id) {
        const trade = await this.repo.findOne({
            where: { id },
            relations: ['counterparty', 'legalEntity', 'trader', 'bond'],
        });
        if (!trade)
            throw new common_1.NotFoundException(`Trade ${id} introuvable`);
        return trade;
    }
    async getStats() {
        const [byType, byStatus, byDesk, totalResult] = await Promise.all([
            this.repo
                .createQueryBuilder('t')
                .select('t.tradeType', 'type')
                .addSelect('COUNT(*)', 'count')
                .addSelect('SUM(t.notional)', 'totalNotional')
                .groupBy('t.tradeType')
                .orderBy('count', 'DESC')
                .getRawMany(),
            this.repo
                .createQueryBuilder('t')
                .select('t.status', 'status')
                .addSelect('COUNT(*)', 'count')
                .groupBy('t.status')
                .orderBy('count', 'DESC')
                .getRawMany(),
            this.repo
                .createQueryBuilder('t')
                .select('t.desk', 'desk')
                .addSelect('COUNT(*)', 'count')
                .where('t.desk IS NOT NULL')
                .groupBy('t.desk')
                .orderBy('count', 'DESC')
                .getRawMany(),
            this.repo
                .createQueryBuilder('t')
                .select('COUNT(*)', 'total')
                .getRawOne(),
        ]);
        return {
            total: parseInt(totalResult.total),
            byType,
            byStatus,
            byDesk,
        };
    }
};
exports.TradesService = TradesService;
exports.TradesService = TradesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trade_entity_1.Trade)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TradesService);
//# sourceMappingURL=trades.service.js.map