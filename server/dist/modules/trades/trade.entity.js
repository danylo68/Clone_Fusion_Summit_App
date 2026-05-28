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
exports.Trade = exports.TradeDirection = exports.TradeStatus = exports.TradeType = void 0;
const typeorm_1 = require("typeorm");
const counterparty_entity_1 = require("../counterparties/counterparty.entity");
const legal_entity_entity_1 = require("../counterparties/legal-entity.entity");
const trader_entity_1 = require("../counterparties/trader.entity");
const bond_entity_1 = require("../bonds/bond.entity");
var TradeType;
(function (TradeType) {
    TradeType["FX_SPOT"] = "FX_SPOT";
    TradeType["FX_SWAP"] = "FX_SWAP";
    TradeType["BOND"] = "BOND";
    TradeType["REPO"] = "REPO";
    TradeType["CDS"] = "CDS";
    TradeType["IRS"] = "IRS";
    TradeType["CCS"] = "CCS";
})(TradeType || (exports.TradeType = TradeType = {}));
var TradeStatus;
(function (TradeStatus) {
    TradeStatus["NEW"] = "NEW";
    TradeStatus["CONFIRMED"] = "CONFIRMED";
    TradeStatus["SETTLED"] = "SETTLED";
    TradeStatus["CANCELLED"] = "CANCELLED";
    TradeStatus["AMENDED"] = "AMENDED";
})(TradeStatus || (exports.TradeStatus = TradeStatus = {}));
var TradeDirection;
(function (TradeDirection) {
    TradeDirection["BUY"] = "BUY";
    TradeDirection["SELL"] = "SELL";
})(TradeDirection || (exports.TradeDirection = TradeDirection = {}));
let Trade = class Trade {
};
exports.Trade = Trade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Trade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trade_ref', unique: true }),
    __metadata("design:type", String)
], Trade.prototype, "tradeRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trade_type', type: 'enum', enum: TradeType }),
    __metadata("design:type", String)
], Trade.prototype, "tradeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TradeStatus, default: TradeStatus.NEW }),
    __metadata("design:type", String)
], Trade.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TradeDirection }),
    __metadata("design:type", String)
], Trade.prototype, "direction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trade_date', type: 'date' }),
    __metadata("design:type", String)
], Trade.prototype, "tradeDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Trade.prototype, "valueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maturity_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Trade.prototype, "maturityDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Trade.prototype, "notional", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notional_currency', length: 3, nullable: true }),
    __metadata("design:type", String)
], Trade.prototype, "notionalCurrency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Trade.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], Trade.prototype, "yield", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_pair', length: 7, nullable: true }),
    __metadata("design:type", String)
], Trade.prototype, "currencyPair", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exchange_rate', type: 'decimal', precision: 15, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Trade.prototype, "exchangeRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'captured_amount', type: 'decimal', precision: 20, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Trade.prototype, "capturedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'captured_currency', length: 3, nullable: true }),
    __metadata("design:type", String)
], Trade.prototype, "capturedCurrency", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Trade.prototype, "desk", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Trade.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => counterparty_entity_1.Counterparty, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'counterparty_id' }),
    __metadata("design:type", counterparty_entity_1.Counterparty)
], Trade.prototype, "counterparty", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => legal_entity_entity_1.LegalEntity, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'legal_entity_id' }),
    __metadata("design:type", legal_entity_entity_1.LegalEntity)
], Trade.prototype, "legalEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => trader_entity_1.Trader, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'trader_id' }),
    __metadata("design:type", trader_entity_1.Trader)
], Trade.prototype, "trader", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bond_entity_1.Bond, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'bond_id' }),
    __metadata("design:type", bond_entity_1.Bond)
], Trade.prototype, "bond", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Trade.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Trade.prototype, "updatedAt", void 0);
exports.Trade = Trade = __decorate([
    (0, typeorm_1.Entity)('trades')
], Trade);
//# sourceMappingURL=trade.entity.js.map