import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Valuation } from './valuation.entity';
import { FilterValuationDto } from './dto/filter-valuation.dto';

@Injectable()
export class ValuationsService {
  constructor(
    @InjectRepository(Valuation)
    private readonly repo: Repository<Valuation>,
  ) {}

  // ── Toutes les valorisations pour une date ───────────────────
  findAll(filter: FilterValuationDto) {
    const date = filter.date || new Date().toISOString().split('T')[0];

    return this.repo
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.trade', 'trade')
      .leftJoinAndSelect('trade.counterparty', 'counterparty')
      .where('v.valuationDate = :date', { date })
      .orderBy('v.mtm', 'DESC')
      .getMany();
  }

  // ── Résumé du portefeuille (MTM total, P&L, DV01) ───────────
  async getPortfolioSummary() {
    const date = new Date().toISOString().split('T')[0];

    return this.repo
      .createQueryBuilder('v')
      .select('SUM(v.mtm)',              'totalMtm')
      .addSelect('SUM(v.dayPnl)',        'totalDayPnl')
      .addSelect('SUM(v.totalPnl)',      'totalPnl')
      .addSelect('SUM(v.dv01)',          'totalDv01')
      .addSelect('SUM(v.accruedInterest)', 'totalAccrued')
      .where('v.valuationDate = :date', { date })
      .getRawOne();
  }

  // ── Historique de valorisation d'un trade ───────────────────
  findByTrade(tradeId: string) {
    return this.repo.find({
      where: { trade: { id: tradeId } },
      order: { valuationDate: 'DESC' },
    });
  }
}
