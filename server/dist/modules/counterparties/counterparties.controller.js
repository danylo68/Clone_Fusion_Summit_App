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
exports.CounterpartiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const counterparties_service_1 = require("./counterparties.service");
const filter_counterparty_dto_1 = require("./dto/filter-counterparty.dto");
let CounterpartiesController = class CounterpartiesController {
    constructor(service) {
        this.service = service;
    }
    findAll(filter) {
        return this.service.findAllCounterparties(filter);
    }
    findAllLegalEntities() {
        return this.service.findAllLegalEntities();
    }
    findAllTraders(filter) {
        return this.service.findAllTraders(filter);
    }
    getReferenceSources() {
        return this.service.getReferenceSources();
    }
    findOne(id) {
        return this.service.findCounterpartyById(id);
    }
    findOneLegalEntity(id) {
        return this.service.findLegalEntityById(id);
    }
    findOneTrader(id) {
        return this.service.findTraderById(id);
    }
};
exports.CounterpartiesController = CounterpartiesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des contreparties' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_counterparty_dto_1.FilterCounterpartyDto]),
    __metadata("design:returntype", void 0)
], CounterpartiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('legal-entities'),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des entités légales' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CounterpartiesController.prototype, "findAllLegalEntities", null);
__decorate([
    (0, common_1.Get)('traders'),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des traders' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_counterparty_dto_1.FilterCounterpartyDto]),
    __metadata("design:returntype", void 0)
], CounterpartiesController.prototype, "findAllTraders", null);
__decorate([
    (0, common_1.Get)('reference-sources'),
    (0, swagger_1.ApiOperation)({ summary: 'Sources de référence disponibles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CounterpartiesController.prototype, "getReferenceSources", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d\'une contrepartie' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CounterpartiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('legal-entities/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d\'une entité légale' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CounterpartiesController.prototype, "findOneLegalEntity", null);
__decorate([
    (0, common_1.Get)('traders/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d\'un trader' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CounterpartiesController.prototype, "findOneTrader", null);
exports.CounterpartiesController = CounterpartiesController = __decorate([
    (0, swagger_1.ApiTags)('Counterparties'),
    (0, common_1.Controller)('counterparties'),
    __metadata("design:paramtypes", [counterparties_service_1.CounterpartiesService])
], CounterpartiesController);
//# sourceMappingURL=counterparties.controller.js.map