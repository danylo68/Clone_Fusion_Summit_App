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
exports.TradeTasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trade_task_entity_1 = require("./trade-task.entity");
let TradeTasksService = class TradeTasksService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(filter) {
        const { page = 1, limit = 50, taskType, status, priority, assignedTo } = filter;
        const qb = this.repo
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.trade', 'trade')
            .leftJoinAndSelect('trade.counterparty', 'counterparty');
        if (taskType)
            qb.andWhere('task.taskType = :taskType', { taskType });
        if (status)
            qb.andWhere('task.status = :status', { status });
        if (priority)
            qb.andWhere('task.priority = :priority', { priority });
        if (assignedTo)
            qb.andWhere('task.assignedTo = :assignedTo', { assignedTo });
        qb.orderBy(`CASE task.priority
        WHEN 'CRITICAL' THEN 1
        WHEN 'HIGH'     THEN 2
        WHEN 'NORMAL'   THEN 3
        ELSE 4
      END`, 'ASC')
            .addOrderBy('task.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(Number(limit));
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page: Number(page), limit: Number(limit) };
    }
    async getDashboard() {
        const [byType, overdue, pending, critical] = await Promise.all([
            this.repo
                .createQueryBuilder('t')
                .select('t.taskType', 'type')
                .addSelect('t.status', 'status')
                .addSelect('COUNT(*)', 'count')
                .groupBy('t.taskType')
                .addGroupBy('t.status')
                .orderBy('t.taskType')
                .getRawMany(),
            this.repo.count({ where: { status: trade_task_entity_1.TaskStatus.OVERDUE } }),
            this.repo.count({ where: { status: trade_task_entity_1.TaskStatus.PENDING } }),
            this.repo.count({ where: { priority: 'CRITICAL', status: trade_task_entity_1.TaskStatus.PENDING } }),
        ]);
        return { byType, overdue, pending, critical };
    }
    async updateStatus(id, dto) {
        const task = await this.repo.findOneBy({ id });
        if (!task)
            throw new common_1.NotFoundException(`Tâche ${id} introuvable`);
        task.status = dto.status;
        if (dto.notes)
            task.notes = dto.notes;
        if (dto.status === trade_task_entity_1.TaskStatus.COMPLETED)
            task.completedAt = new Date();
        return this.repo.save(task);
    }
};
exports.TradeTasksService = TradeTasksService;
exports.TradeTasksService = TradeTasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trade_task_entity_1.TradeTask)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TradeTasksService);
//# sourceMappingURL=trade-tasks.service.js.map