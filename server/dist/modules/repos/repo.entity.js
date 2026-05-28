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
exports.RepoTrade = void 0;
const typeorm_1 = require("typeorm");
const trade_entity_1 = require("../trades/trade.entity");
const bond_entity_1 = require("../bonds/bond.entity");
let RepoTrade = class RepoTrade {
};
exports.RepoTrade = RepoTrade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RepoTrade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => trade_entity_1.Trade),
    (0, typeorm_1.JoinColumn)({ name: 'trade_id' }),
    __metadata("design:type", trade_entity_1.Trade)
], RepoTrade.prototype, "trade", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bond_entity_1.Bond, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'bond_id' }),
    __metadata("design:type", bond_entity_1.Bond)
], RepoTrade.prototype, "bond", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'repo_type', default: 'REPO' }),
    __metadata("design:type", String)
], RepoTrade.prototype, "repoType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 4 }),
    __metadata("design:type", Number)
], RepoTrade.prototype, "notional", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3 }),
    __metadata("design:type", String)
], RepoTrade.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'repo_rate', type: 'decimal', precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], RepoTrade.prototype, "repoRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date' }),
    __metadata("design:type", String)
], RepoTrade.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date' }),
    __metadata("design:type", String)
], RepoTrade.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 8, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], RepoTrade.prototype, "haircut", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collateral_isin', nullable: true }),
    __metadata("design:type", String)
], RepoTrade.prototype, "collateralIsin", void 0);
exports.RepoTrade = RepoTrade = __decorate([
    (0, typeorm_1.Entity)('repo_trades')
], RepoTrade);
//# sourceMappingURL=repo.entity.js.map