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
exports.DerivativeTrade = void 0;
const typeorm_1 = require("typeorm");
const trade_entity_1 = require("../trades/trade.entity");
let DerivativeTrade = class DerivativeTrade {
};
exports.DerivativeTrade = DerivativeTrade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => trade_entity_1.Trade),
    (0, typeorm_1.JoinColumn)({ name: 'trade_id' }),
    __metadata("design:type", trade_entity_1.Trade)
], DerivativeTrade.prototype, "trade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'derivative_type' }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "derivativeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 4 }),
    __metadata("design:type", Number)
], DerivativeTrade.prototype, "notional", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3 }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pay_leg_type' }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "payLegType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pay_rate', type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], DerivativeTrade.prototype, "payRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pay_frequency', nullable: true }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "payFrequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receive_leg_type' }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "receiveLegType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receive_rate', type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], DerivativeTrade.prototype, "receiveRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receive_frequency', nullable: true }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "receiveFrequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'floating_index', nullable: true }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "floatingIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date' }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maturity_date', type: 'date' }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "maturityDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'day_count', default: 'ACT/360' }),
    __metadata("design:type", String)
], DerivativeTrade.prototype, "dayCount", void 0);
exports.DerivativeTrade = DerivativeTrade = __decorate([
    (0, typeorm_1.Entity)('derivative_trades')
], DerivativeTrade);
//# sourceMappingURL=derivative.entity.js.map