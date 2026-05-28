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
exports.ValuationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const valuations_service_1 = require("./valuations.service");
const filter_valuation_dto_1 = require("./dto/filter-valuation.dto");
let ValuationsController = class ValuationsController {
    constructor(service) {
        this.service = service;
    }
    getPortfolio() {
        return this.service.getPortfolioSummary();
    }
    findByTrade(tradeId) {
        return this.service.findByTrade(tradeId);
    }
    findAll(filter) {
        return this.service.findAll(filter);
    }
};
exports.ValuationsController = ValuationsController;
__decorate([
    (0, common_1.Get)('portfolio'),
    (0, swagger_1.ApiOperation)({ summary: 'Résumé portefeuille — MTM total, P&L, DV01' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ValuationsController.prototype, "getPortfolio", null);
__decorate([
    (0, common_1.Get)('trade/:tradeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Historique de valorisation d\'un trade' }),
    __param(0, (0, common_1.Param)('tradeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ValuationsController.prototype, "findByTrade", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Valorisations du jour (ou date précisée)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_valuation_dto_1.FilterValuationDto]),
    __metadata("design:returntype", void 0)
], ValuationsController.prototype, "findAll", null);
exports.ValuationsController = ValuationsController = __decorate([
    (0, swagger_1.ApiTags)('Valuations'),
    (0, common_1.Controller)('valuations'),
    __metadata("design:paramtypes", [valuations_service_1.ValuationsService])
], ValuationsController);
//# sourceMappingURL=valuations.controller.js.map