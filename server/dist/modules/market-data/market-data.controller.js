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
exports.MarketDataController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const market_data_service_1 = require("./market-data.service");
const market_data_entity_1 = require("./market-data.entity");
let MarketDataController = class MarketDataController {
    constructor(service) {
        this.service = service;
    }
    getFxRates(date) {
        return this.service.findByType(market_data_entity_1.InstrumentType.FX, date);
    }
    getRates(date) {
        return this.service.findByType(market_data_entity_1.InstrumentType.RATE, date);
    }
    getCreditSpreads(date) {
        return this.service.findByType(market_data_entity_1.InstrumentType.CREDIT_SPREAD, date);
    }
    getBondPrices(date) {
        return this.service.findByType(market_data_entity_1.InstrumentType.BOND_PRICE, date);
    }
    findByTicker(ticker) {
        return this.service.findByTicker(ticker);
    }
    findAll(date) {
        return this.service.findAll(date);
    }
};
exports.MarketDataController = MarketDataController;
__decorate([
    (0, common_1.Get)('fx-rates'),
    (0, swagger_1.ApiOperation)({ summary: 'Taux de change FX' }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketDataController.prototype, "getFxRates", null);
__decorate([
    (0, common_1.Get)('rates'),
    (0, swagger_1.ApiOperation)({ summary: 'Taux d\'intérêt (EURIBOR, SOFR, SONIA...)' }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketDataController.prototype, "getRates", null);
__decorate([
    (0, common_1.Get)('credit-spreads'),
    (0, swagger_1.ApiOperation)({ summary: 'Spreads de crédit (iTraxx, CDX...)' }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketDataController.prototype, "getCreditSpreads", null);
__decorate([
    (0, common_1.Get)('bond-prices'),
    (0, swagger_1.ApiOperation)({ summary: 'Prix des obligations' }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketDataController.prototype, "getBondPrices", null);
__decorate([
    (0, common_1.Get)('ticker/:ticker'),
    (0, swagger_1.ApiOperation)({ summary: 'Historique d\'un ticker (30 jours)' }),
    __param(0, (0, common_1.Param)('ticker')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketDataController.prototype, "findByTicker", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Toutes les données marché du jour' }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketDataController.prototype, "findAll", null);
exports.MarketDataController = MarketDataController = __decorate([
    (0, swagger_1.ApiTags)('Market Data'),
    (0, common_1.Controller)('market-data'),
    __metadata("design:paramtypes", [market_data_service_1.MarketDataService])
], MarketDataController);
//# sourceMappingURL=market-data.controller.js.map