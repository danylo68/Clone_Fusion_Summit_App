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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FxSwapTrade = void 0;
const typeorm_1 = require("typeorm");
const trade_entity_1 = require("../trades/trade.entity");
let FxSwapTrade = class FxSwapTrade {
};
exports.FxSwapTrade = FxSwapTrade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FxSwapTrade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => trade_entity_1.Trade),
    (0, typeorm_1.JoinColumn)({ name: 'trade_id' }),
    __metadata("design:type", trade_entity_1.Trade)
], FxSwapTrade.prototype, "trade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_pair', length: 7 }),
    __metadata("design:type", String)
], FxSwapTrade.prototype, "currencyPair", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FxSwapTrade.prototype, "direction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'captured_near_amount', type: 'decimal', precision: 20, scale: 4 }),
    __metadata("design:type", Number)
], FxSwapTrade.prototype, "capturedNearAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'captured_currency', length: 3 }),
    __metadata("design:type", String)
], FxSwapTrade.prototype, "capturedCurrency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exchange_rate', type: 'decimal', precision: 15, scale: 8 }),
    __metadata("design:type", Number)
], FxSwapTrade.prototype, "exchangeRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'spot_margin', type: 'decimal', precision: 10, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], FxSwapTrade.prototype, "spotMargin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'far_exchange_rate', type: 'decimal', precision: 15, scale: 8 }),
    __metadata("design:type", Number)
], FxSwapTrade.prototype, "farExchangeRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'far_margin', type: 'decimal', precision: 10, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], FxSwapTrade.prototype, "farMargin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'near_settlement_date', type: 'date' }),
    __metadata("design:type", String)
], FxSwapTrade.prototype, "nearSettlementDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'far_settlement_date', type: 'date' }),
    __metadata("design:type", String)
], FxSwapTrade.prototype, "farSettlementDate", void 0);
exports.FxSwapTrade = FxSwapTrade = __decorate([
    (0, typeorm_1.Entity)('fx_swap_trades')
], FxSwapTrade);
//# sourceMappingURL=fx-swap.entity.js.map