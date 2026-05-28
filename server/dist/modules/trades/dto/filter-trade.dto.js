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
exports.FilterTradeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const trade_entity_1 = require("../trade.entity");
class FilterTradeDto {
    constructor() {
        this.page = 1;
        this.limit = 50;
    }
}
exports.FilterTradeDto = FilterTradeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: trade_entity_1.TradeType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(trade_entity_1.TradeType),
    __metadata("design:type", String)
], FilterTradeDto.prototype, "tradeType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: trade_entity_1.TradeStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(trade_entity_1.TradeStatus),
    __metadata("design:type", String)
], FilterTradeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterTradeDto.prototype, "desk", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date début (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterTradeDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date fin (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterTradeDto.prototype, "dateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Recherche libre (ref, contrepartie, paire FX)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterTradeDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterTradeDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 50 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterTradeDto.prototype, "limit", void 0);
//# sourceMappingURL=filter-trade.dto.js.map