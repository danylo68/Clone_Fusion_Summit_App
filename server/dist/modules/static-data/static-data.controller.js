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
exports.StaticDataController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const static_data_service_1 = require("./static-data.service");
let StaticDataController = class StaticDataController {
    constructor(service) {
        this.service = service;
    }
    getTradeTypes() {
        return this.service.getTradeTypes();
    }
    getTradeStatuses() {
        return this.service.getTradeStatuses();
    }
    getTaskTypes() {
        return this.service.getTaskTypes();
    }
    getDesks() {
        return this.service.getDesks();
    }
};
exports.StaticDataController = StaticDataController;
__decorate([
    (0, common_1.Get)('trade-types'),
    (0, swagger_1.ApiOperation)({ summary: 'Types de trades disponibles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaticDataController.prototype, "getTradeTypes", null);
__decorate([
    (0, common_1.Get)('trade-statuses'),
    (0, swagger_1.ApiOperation)({ summary: 'Statuts de trades disponibles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaticDataController.prototype, "getTradeStatuses", null);
__decorate([
    (0, common_1.Get)('task-types'),
    (0, swagger_1.ApiOperation)({ summary: 'Types de tâches back/middle office' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaticDataController.prototype, "getTaskTypes", null);
__decorate([
    (0, common_1.Get)('desks'),
    (0, swagger_1.ApiOperation)({ summary: 'Desks de trading' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaticDataController.prototype, "getDesks", null);
exports.StaticDataController = StaticDataController = __decorate([
    (0, swagger_1.ApiTags)('Static Data'),
    (0, common_1.Controller)('static-data'),
    __metadata("design:paramtypes", [static_data_service_1.StaticDataService])
], StaticDataController);
//# sourceMappingURL=static-data.controller.js.map