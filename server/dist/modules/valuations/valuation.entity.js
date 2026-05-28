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
exports.Valuation = void 0;
const typeorm_1 = require("typeorm");
const trade_entity_1 = require("../trades/trade.entity");
let Valuation = class Valuation {
};
exports.Valuation = Valuation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Valuation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => trade_entity_1.Trade, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'trade_id' }),
    __metadata("design:type", trade_entity_1.Trade)
], Valuation.prototype, "trade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valuation_date', type: 'date' }),
    __metadata("design:type", String)
], Valuation.prototype, "valuationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "mtm", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'day_pnl', type: 'decimal', precision: 20, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "dayPnl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_pnl', type: 'decimal', precision: 20, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "totalPnl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "dv01", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accrued_interest', type: 'decimal', precision: 20, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "accruedInterest", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dirty_price', type: 'decimal', precision: 15, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "dirtyPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'clean_price', type: 'decimal', precision: 15, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "cleanPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3, default: 'EUR' }),
    __metadata("design:type", String)
], Valuation.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Valuation.prototype, "createdAt", void 0);
exports.Valuation = Valuation = __decorate([
    (0, typeorm_1.Entity)('valuations'),
    (0, typeorm_1.Unique)(['trade', 'valuationDate'])
], Valuation);
//# sourceMappingURL=valuation.entity.js.map