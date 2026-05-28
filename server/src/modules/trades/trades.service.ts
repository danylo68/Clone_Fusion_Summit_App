import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trade } from './trade.entity';
import { FilterTradeDto } from './dto/filter-trade.dto';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Trade)
    private readonly repo: Repository<Trade>,
  ) {}

  // ── Liste avec filtres + pagination ──────────────────────────
  async findAll(filter: FilterTradeDto) {
    const { page = 1, limit = 50, tradeType, status, desk, dateFrom, dateTo, search } = filter;

    const qb = this.repo
      .createQueryBuilder('trade')
      .leftJoinAndSelect('trade.counterparty', 'counterparty')
      .leftJoinAndSelect('trade.legalEntity',  'legalEntity')
      .leftJoinAndSelect('trade.trader',        'trader')
      .leftJoinAndSelect('trade.bond',          'bond');

    if (tradeType) qb.andWhere('trade.tradeType = :tradeType', { tradeType });
    if (status)    qb.andWhere('trade.status = :status',       { status });
    if (desk)      qb.andWhere('trade.desk = :desk',           { desk });
    if (dateFrom)  qb.andWhere('trade.tradeDate >= :dateFrom', { dateFrom });
    if (dateTo)    qb.andWhere('trade.tradeDate <= :dateTo',   { dateTo });
    if (search) {
      qb.andWhere(
        '(trade.tradeRef ILIKE :s OR counterparty.name ILIKE :s OR trade.currencyPair ILIKE :s)',
        { s: `%${search}%` },
      );
    }

    qb.orderBy('trade.tradeDate', 'DESC')
      .skip((page - 1) * limit)
      .take(Number(limit));

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page:  Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    };
  }

  // ── Détail d'un trade par ID ─────────────────────────────────
  async findById(id: string): Promise<Trade> {
    const trade = await this.repo.findOne({
      where: { id },
      relations: ['counterparty', 'legalEntity', 'trader', 'bond'],
    });
    if (!trade) throw new NotFoundException(`Trade ${id} introuvable`);
    return trade;
  }

  // ── Statistiques globales ────────────────────────────────────
  async getStats() {
    const [byType, byStatus, byDesk, totalResult] = await Promise.all([
      this.repo
        .createQueryBuilder('t')
        .select('t.tradeType', 'type')
        .addSelect('COUNT(*)', 'count')
        .addSelect('SUM(t.notional)', 'totalNotional')
        .groupBy('t.tradeType')
        .orderBy('count', 'DESC')
        .getRawMany(),

      this.repo
        .createQueryBuilder('t')
        .select('t.status', 'status')
        .addSelect('COUNT(*)', 'count')
        .groupBy('t.status')
        .orderBy('count', 'DESC')
        .getRawMany(),

      this.repo
        .createQueryBuilder('t')
        .select('t.desk', 'desk')
        .addSelect('COUNT(*)', 'count')
        .where('t.desk IS NOT NULL')
        .groupBy('t.desk')
        .orderBy('count', 'DESC')
        .getRawMany(),

      this.repo
        .createQueryBuilder('t')
        .select('COUNT(*)', 'total')
        .getRawOne(),
    ]);

    return {
      total:    parseInt(totalResult.total),
      byType,
      byStatus,
      byDesk,
    };
  }
}
