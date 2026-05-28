import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trade, TradeType } from '../trades/trade.entity';

@Injectable()
export class FxSpotService {
  constructor(
    @InjectRepository(Trade)
    private readonly repo: Repository<Trade>,
  ) {}

  async findAll(counterpartyRef?: string, page = 1, limit = 50) {
    const qb = this.repo
      .createQueryBuilder('t')
      .where('t.tradeType = :type', { type: TradeType.FX_SPOT })
      .leftJoinAndSelect('t.counterparty', 'c')
      .leftJoinAndSelect('t.trader', 'tr');

    if (counterpartyRef) qb.andWhere('c.reference = :ref', { ref: counterpartyRef });

    qb.orderBy('t.tradeDate', 'DESC').skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findById(id: string) {
    const trade = await this.repo.findOne({
      where: { id, tradeType: TradeType.FX_SPOT },
      relations: ['counterparty', 'trader'],
    });
    if (!trade) throw new NotFoundException(`FX Spot ${id} introuvable`);
    return trade;
  }
}
