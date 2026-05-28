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
exports.TradeTask = exports.TaskPriority = exports.TaskStatus = exports.TaskType = void 0;
const typeorm_1 = require("typeorm");
const trade_entity_1 = require("../trades/trade.entity");
var TaskType;
(function (TaskType) {
    TaskType["CONFIRMATION"] = "CONFIRMATION";
    TaskType["SETTLEMENT"] = "SETTLEMENT";
    TaskType["VALUATION"] = "VALUATION";
    TaskType["MARGIN_CALL"] = "MARGIN_CALL";
    TaskType["ACCOUNTING"] = "ACCOUNTING";
    TaskType["REPORTING"] = "REPORTING";
})(TaskType || (exports.TaskType = TaskType = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "PENDING";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["COMPLETED"] = "COMPLETED";
    TaskStatus["FAILED"] = "FAILED";
    TaskStatus["OVERDUE"] = "OVERDUE";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LOW"] = "LOW";
    TaskPriority["NORMAL"] = "NORMAL";
    TaskPriority["HIGH"] = "HIGH";
    TaskPriority["CRITICAL"] = "CRITICAL";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
let TradeTask = class TradeTask {
};
exports.TradeTask = TradeTask;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TradeTask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => trade_entity_1.Trade, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'trade_id' }),
    __metadata("design:type", trade_entity_1.Trade)
], TradeTask.prototype, "trade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_type', type: 'enum', enum: TaskType }),
    __metadata("design:type", String)
], TradeTask.prototype, "taskType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING }),
    __metadata("design:type", String)
], TradeTask.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TaskPriority, default: TaskPriority.NORMAL }),
    __metadata("design:type", String)
], TradeTask.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_to', nullable: true }),
    __metadata("design:type", String)
], TradeTask.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], TradeTask.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], TradeTask.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], TradeTask.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TradeTask.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], TradeTask.prototype, "updatedAt", void 0);
exports.TradeTask = TradeTask = __decorate([
    (0, typeorm_1.Entity)('trade_tasks')
], TradeTask);
//# sourceMappingURL=trade-task.entity.js.map