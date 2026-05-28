import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counterparty } from './counterparty.entity';
import { LegalEntity } from './legal-entity.entity';
import { Trader } from './trader.entity';
import { FilterCounterpartyDto } from './dto/filter-counterparty.dto';

@Injectable()
export class CounterpartiesService {
  constructor(
    @InjectRepository(Counterparty)
    private readonly counterpartyRepo: Repository<Counterparty>,

    @InjectRepository(LegalEntity)
    private readonly legalEntityRepo: Repository<LegalEntity>,

    @InjectRepository(Trader)
    private readonly traderRepo: Repository<Trader>,
  ) {}

  // ── Contreparties ────────────────────────────────────────────
  findAllCounterparties(filter: FilterCounterpartyDto) {
    const qb = this.counterpartyRepo
      .createQueryBuilder('c')
      .where('c.active = true');

    if (filter.type) qb.andWhere('c.type = :type', { type: filter.type });

    return qb.orderBy('c.name').getMany();
  }

  async findCounterpartyById(id: string): Promise<Counterparty> {
    const counterparty = await this.counterpartyRepo.findOneBy({ id });
    if (!counterparty) throw new NotFoundException(`Contrepartie ${id} introuvable`);
    return counterparty;
  }

  // ── Entités légales ──────────────────────────────────────────
  findAllLegalEntities() {
    return this.legalEntityRepo.find({
      where: { active: true },
      order: { name: 'ASC' },
    });
  }

  async findLegalEntityById(id: string): Promise<LegalEntity> {
    const entity = await this.legalEntityRepo.findOneBy({ id });
    if (!entity) throw new NotFoundException(`Entité légale ${id} introuvable`);
    return entity;
  }

  // ── Traders ──────────────────────────────────────────────────
  findAllTraders(filter: FilterCounterpartyDto) {
    const qb = this.traderRepo
      .createQueryBuilder('t')
      .where('t.active = true');

    if (filter.desk) qb.andWhere('t.desk = :desk', { desk: filter.desk });

    return qb.orderBy('t.lastName').getMany();
  }

  async findTraderById(id: string): Promise<Trader> {
    const trader = await this.traderRepo.findOneBy({ id });
    if (!trader) throw new NotFoundException(`Trader ${id} introuvable`);
    return trader;
  }

  // ── Sources de référence (statique) ─────────────────────────
  getReferenceSources() {
    return [
      { code: 'BBG',        name: 'Bloomberg',    applicableEntities: ['counterparties', 'legal-entities', 'traders'] },
      { code: 'FIXSESSION', name: 'FIX Session',  applicableEntities: ['counterparties'] },
      { code: 'REUTERS',    name: 'Reuters',       applicableEntities: ['counterparties', 'legal-entities'] },
    ];
  }
}
