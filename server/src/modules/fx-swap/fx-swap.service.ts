import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trade, TradeType } from '../trades/trade.entity';

@Injectable()
export class FxSwapService {
  constructor(
    @InjectRepository(Trade)
    private readonly repo: Repository<Trade>,
  ) {}

  async findAll(page = 1, limit = 50) {
    const [items, total] = await this.repo.findAndCount({
      where: { tradeType: TradeType.FX_SWAP },
      relations: ['counterparty', 'trader'],
      order: { tradeDate: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total, page, limit };
  }

  async findById(id: string) {
    const trade = await this.repo.findOne({
      where: { id, tradeType: TradeType.FX_SWAP },
      relations: ['counterparty', 'trader'],
    });
    if (!trade) throw new NotFoundException(`FX Swap ${id} introuvable`);
    return trade;
  }
}
