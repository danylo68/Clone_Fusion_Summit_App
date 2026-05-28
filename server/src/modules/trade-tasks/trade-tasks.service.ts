import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeTask, TaskStatus } from './trade-task.entity';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TradeTasksService {
  constructor(
    @InjectRepository(TradeTask)
    private readonly repo: Repository<TradeTask>,
  ) {}

  // ── Liste avec filtres + pagination ──────────────────────────
  async findAll(filter: FilterTaskDto) {
    const { page = 1, limit = 50, taskType, status, priority, assignedTo } = filter;

    const qb = this.repo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.trade',              'trade')
      .leftJoinAndSelect('trade.counterparty',      'counterparty');

    if (taskType)   qb.andWhere('task.taskType = :taskType',     { taskType });
    if (status)     qb.andWhere('task.status = :status',         { status });
    if (priority)   qb.andWhere('task.priority = :priority',     { priority });
    if (assignedTo) qb.andWhere('task.assignedTo = :assignedTo', { assignedTo });

    // Tri : critiques en premier, puis par date
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

  // ── Dashboard stats ──────────────────────────────────────────
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

      this.repo.count({ where: { status: TaskStatus.OVERDUE } }),
      this.repo.count({ where: { status: TaskStatus.PENDING } }),
      this.repo.count({ where: { priority: 'CRITICAL' as any, status: TaskStatus.PENDING } }),
    ]);

    return { byType, overdue, pending, critical };
  }

  // ── Mise à jour du statut ────────────────────────────────────
  async updateStatus(id: string, dto: UpdateTaskDto): Promise<TradeTask> {
    const task = await this.repo.findOneBy({ id });
    if (!task) throw new NotFoundException(`Tâche ${id} introuvable`);

    task.status = dto.status;
    if (dto.notes)  task.notes = dto.notes;
    if (dto.status === TaskStatus.COMPLETED) task.completedAt = new Date();

    return this.repo.save(task);
  }
}
