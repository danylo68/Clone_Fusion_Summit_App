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
exports.FxSpotTrade = void 0;
const typeorm_1 = require("typeorm");
const trade_entity_1 = require("../trades/trade.entity");
let FxSpotTrade = class FxSpotTrade {
};
exports.FxSpotTrade = FxSpotTrade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FxSpotTrade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => trade_entity_1.Trade),
    (0, typeorm_1.JoinColumn)({ name: 'trade_id' }),
    __metadata("design:type", trade_entity_1.Trade)
], FxSpotTrade.prototype, "trade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_pair', length: 7 }),
    __metadata("design:type", String)
], FxSpotTrade.prototype, "currencyPair", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FxSpotTrade.prototype, "direction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'captured_amount', type: 'decimal', precision: 20, scale: 4 }),
    __metadata("design:type", Number)
], FxSpotTrade.prototype, "capturedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'captured_currency', length: 3 }),
    __metadata("design:type", String)
], FxSpotTrade.prototype, "capturedCurrency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exchange_rate', type: 'decimal', precision: 15, scale: 8 }),
    __metadata("design:type", Number)
], FxSpotTrade.prototype, "exchangeRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'settlement_date', type: 'date' }),
    __metadata("design:type", String)
], FxSpotTrade.prototype, "settlementDate", void 0);
exports.FxSpotTrade = FxSpotTrade = __decorate([
    (0, typeorm_1.Entity)('fx_spot_trades')
], FxSpotTrade);
//# sourceMappingURL=fx-spot.entity.js.map