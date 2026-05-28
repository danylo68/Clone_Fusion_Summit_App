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
exports.MarketData = exports.InstrumentType = void 0;
const typeorm_1 = require("typeorm");
var InstrumentType;
(function (InstrumentType) {
    InstrumentType["FX"] = "FX";
    InstrumentType["RATE"] = "RATE";
    InstrumentType["CREDIT_SPREAD"] = "CREDIT_SPREAD";
    InstrumentType["BOND_PRICE"] = "BOND_PRICE";
})(InstrumentType || (exports.InstrumentType = InstrumentType = {}));
let MarketData = class MarketData {
};
exports.MarketData = MarketData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarketData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'instrument_type', type: 'enum', enum: InstrumentType }),
    __metadata("design:type", String)
], MarketData.prototype, "instrumentType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MarketData.prototype, "ticker", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 8 }),
    __metadata("design:type", Number)
], MarketData.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 3 }),
    __metadata("design:type", String)
], MarketData.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MarketData.prototype, "tenor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'as_of_date', type: 'date' }),
    __metadata("design:type", String)
], MarketData.prototype, "asOfDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'BLOOMBERG' }),
    __metadata("design:type", String)
], MarketData.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], MarketData.prototype, "createdAt", void 0);
exports.MarketData = MarketData = __decorate([
    (0, typeorm_1.Entity)('market_data'),
    (0, typeorm_1.Unique)(['ticker', 'asOfDate'])
], MarketData);
//# sourceMappingURL=market-data.entity.js.map