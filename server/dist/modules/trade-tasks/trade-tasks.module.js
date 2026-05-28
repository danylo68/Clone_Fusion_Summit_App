"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeTasksModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trade_task_entity_1 = require("./trade-task.entity");
const trade_tasks_service_1 = require("./trade-tasks.service");
const trade_tasks_controller_1 = require("./trade-tasks.controller");
let TradeTasksModule = class TradeTasksModule {
};
exports.TradeTasksModule = TradeTasksModule;
exports.TradeTasksModule = TradeTasksModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([trade_task_entity_1.TradeTask])],
        controllers: [trade_tasks_controller_1.TradeTasksController],
        providers: [trade_tasks_service_1.TradeTasksService],
        exports: [trade_tasks_service_1.TradeTasksService, typeorm_1.TypeOrmModule],
    })
], TradeTasksModule);
//# sourceMappingURL=trade-tasks.module.js.map