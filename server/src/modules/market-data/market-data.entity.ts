import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, Unique,
} from 'typeorm';

export enum InstrumentType {
  FX            = 'FX',
  RATE          = 'RATE',
  CREDIT_SPREAD = 'CREDIT_SPREAD',
  BOND_PRICE    = 'BOND_PRICE',
}

@Entity('market_data')
@Unique(['ticker', 'asOfDate'])
export class MarketData {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ name: 'instrument_type', type: 'enum', enum: InstrumentType })
  instrumentType: InstrumentType;

  @Column()
  ticker: string;

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  value: number;

  @Column({ nullable: true, length: 3 })
  currency: string;

  @Column({ nullable: true })
  tenor: string;

  @Column({ name: 'as_of_date', type: 'date' })
  asOfDate: string;

  @Column({ default: 'BLOOMBERG' })
  source: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
