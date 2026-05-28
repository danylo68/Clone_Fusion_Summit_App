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
exports.BondsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bonds_service_1 = require("./bonds.service");
const filter_bond_dto_1 = require("./dto/filter-bond.dto");
let BondsController = class BondsController {
    constructor(service) {
        this.service = service;
    }
    findAll(filter) {
        return this.service.findAll(filter);
    }
    findByIsin(isin) {
        return this.service.findByIsin(isin);
    }
    findOne(id) {
        return this.service.findById(id);
    }
};
exports.BondsController = BondsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des obligations' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_bond_dto_1.FilterBondDto]),
    __metadata("design:returntype", void 0)
], BondsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('isin/:isin'),
    (0, swagger_1.ApiOperation)({ summary: 'Obligation par ISIN' }),
    __param(0, (0, common_1.Param)('isin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BondsController.prototype, "findByIsin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obligation par ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BondsController.prototype, "findOne", null);
exports.BondsController = BondsController = __decorate([
    (0, swagger_1.ApiTags)('Bonds'),
    (0, common_1.Controller)('bonds'),
    __metadata("design:paramtypes", [bonds_service_1.BondsService])
], BondsController);
//# sourceMappingURL=bonds.controller.js.map