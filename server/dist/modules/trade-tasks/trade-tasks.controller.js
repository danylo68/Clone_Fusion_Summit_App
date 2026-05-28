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
exports.TradeTasksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const trade_tasks_service_1 = require("./trade-tasks.service");
const filter_task_dto_1 = require("./dto/filter-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
let TradeTasksController = class TradeTasksController {
    constructor(service) {
        this.service = service;
    }
    getDashboard() {
        return this.service.getDashboard();
    }
    findAll(filter) {
        return this.service.findAll(filter);
    }
    updateStatus(id, dto) {
        return this.service.updateStatus(id, dto);
    }
};
exports.TradeTasksController = TradeTasksController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Dashboard back/middle office — stats par type et statut' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TradeTasksController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'File de tâches back/middle office' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_task_dto_1.FilterTaskDto]),
    __metadata("design:returntype", void 0)
], TradeTasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour le statut d\'une tâche' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TradeTasksController.prototype, "updateStatus", null);
exports.TradeTasksController = TradeTasksController = __decorate([
    (0, swagger_1.ApiTags)('Trade Tasks'),
    (0, common_1.Controller)('trade-tasks'),
    __metadata("design:paramtypes", [trade_tasks_service_1.TradeTasksService])
], TradeTasksController);
//# sourceMappingURL=trade-tasks.controller.js.map