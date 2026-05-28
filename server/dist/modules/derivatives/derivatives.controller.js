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
exports.DerivativesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const derivatives_service_1 = require("./derivatives.service");
let DerivativesController = class DerivativesController {
    constructor(service) {
        this.service = service;
    }
    findAll(type, page = 1, limit = 50) {
        return this.service.findAll(type, +page, +limit);
    }
    findOne(id) {
        return this.service.findById(id);
    }
};
exports.DerivativesController = DerivativesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des dérivés IRS et CCS' }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], DerivativesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d\'un dérivé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DerivativesController.prototype, "findOne", null);
exports.DerivativesController = DerivativesController = __decorate([
    (0, swagger_1.ApiTags)('Derivatives'),
    (0, common_1.Controller)('derivatives'),
    __metadata("design:paramtypes", [derivatives_service_1.DerivativesService])
], DerivativesController);
//# sourceMappingURL=derivatives.controller.js.map