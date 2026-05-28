import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketData, InstrumentType } from './market-data.entity';

@Injectable()
export class MarketDataService {
  constructor(
    @InjectRepository(MarketData)
    private readonly repo: Repository<MarketData>,
  ) {}

  // ── Par type d'instrument ────────────────────────────────────
  findByType(type: InstrumentType, date?: string) {
    const today = date || new Date().toISOString().split('T')[0];

    return this.repo.find({
      where: { instrumentType: type, asOfDate: today },
      order: { ticker: 'ASC' },
    });
  }

  // ── Historique d'un ticker (30 jours) ───────────────────────
  findByTicker(ticker: string) {
    return this.repo.find({
      where: { ticker },
      order: { asOfDate: 'DESC' },
      take: 30,
    });
  }

  // ── Toutes les données pour une date ────────────────────────
  findAll(date?: string) {
    const today = date || new Date().toISOString().split('T')[0];
    return this.repo.find({
      where: { asOfDate: today },
      order: { instrumentType: 'ASC', ticker: 'ASC' },
    });
  }
}
