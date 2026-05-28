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
exports.FxSpotService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trade_entity_1 = require("../trades/trade.entity");
let FxSpotService = class FxSpotService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(counterpartyRef, page = 1, limit = 50) {
        const qb = this.repo
            .createQueryBuilder('t')
            .where('t.tradeType = :type', { type: trade_entity_1.TradeType.FX_SPOT })
            .leftJoinAndSelect('t.counterparty', 'c')
            .leftJoinAndSelect('t.trader', 'tr');
        if (counterpartyRef)
            qb.andWhere('c.reference = :ref', { ref: counterpartyRef });
        qb.orderBy('t.tradeDate', 'DESC').skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, limit };
    }
    async findById(id) {
        const trade = await this.repo.findOne({
            where: { id, tradeType: trade_entity_1.TradeType.FX_SPOT },
            relations: ['counterparty', 'trader'],
        });
        if (!trade)
            throw new common_1.NotFoundException(`FX Spot ${id} introuvable`);
        return trade;
    }
};
exports.FxSpotService = FxSpotService;
exports.FxSpotService = FxSpotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trade_entity_1.Trade)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FxSpotService);
//# sourceMappingURL=fx-spot.service.js.map