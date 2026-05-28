import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Trade, TradeType } from '../trades/trade.entity';

@Injectable()
export class DerivativesService {
  constructor(
    @InjectRepository(Trade)
    private readonly repo: Repository<Trade>,
  ) {}

  async findAll(type?: string, page = 1, limit = 50) {
    const types = type
      ? [type as TradeType]
      : [TradeType.IRS, TradeType.CCS];

    const [items, total] = await this.repo.findAndCount({
      where: { tradeType: In(types) },
      relations: ['counterparty', 'trader'],
      order: { tradeDate: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total, page, limit };
  }

  async findById(id: string) {
    const trade = await this.repo.findOne({
      where: { id },
      relations: ['counterparty', 'trader'],
    });
    if (!trade) throw new NotFoundException(`Dérivé ${id} introuvable`);
    return trade;
  }
}
