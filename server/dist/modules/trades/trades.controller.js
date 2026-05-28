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
exports.TradesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const trades_service_1 = require("./trades.service");
const filter_trade_dto_1 = require("./dto/filter-trade.dto");
let TradesController = class TradesController {
    constructor(service) {
        this.service = service;
    }
    getStats() {
        return this.service.getStats();
    }
    findAll(filter) {
        return this.service.findAll(filter);
    }
    findOne(id) {
        return this.service.findById(id);
    }
};
exports.TradesController = TradesController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Statistiques globales des trades' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TradesController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Trade blotter — liste avec filtres et pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_trade_dto_1.FilterTradeDto]),
    __metadata("design:returntype", void 0)
], TradesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d\'un trade' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TradesController.prototype, "findOne", null);
exports.TradesController = TradesController = __decorate([
    (0, swagger_1.ApiTags)('Trades'),
    (0, common_1.Controller)('trades'),
    __metadata("design:paramtypes", [trades_service_1.TradesService])
], TradesController);
//# sourceMappingURL=trades.controller.js.map