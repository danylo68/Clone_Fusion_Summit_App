import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bond } from './bond.entity';
import { FilterBondDto } from './dto/filter-bond.dto';

@Injectable()
export class BondsService {
  constructor(
    @InjectRepository(Bond)
    private readonly repo: Repository<Bond>,
  ) {}

  findAll(filter: FilterBondDto) {
    const qb = this.repo
      .createQueryBuilder('b')
      .where('b.active = true');

    if (filter.country) qb.andWhere('b.country = :country', { country: filter.country });
    if (filter.sector)  qb.andWhere('b.sector = :sector',   { sector: filter.sector });
    if (filter.type)    qb.andWhere('b.type = :type',        { type: filter.type });

    return qb.orderBy('b.issuer').addOrderBy('b.maturityDate').getMany();
  }

  async findById(id: string): Promise<Bond> {
    const bond = await this.repo.findOneBy({ id });
    if (!bond) throw new NotFoundException(`Obligation ${id} introuvable`);
    return bond;
  }

  async findByIsin(isin: string): Promise<Bond> {
    const bond = await this.repo.findOneBy({ isin });
    if (!bond) throw new NotFoundException(`Obligation ISIN ${isin} introuvable`);
    return bond;
  }
}
