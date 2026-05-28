import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Counterparty } from '../counterparties/counterparty.entity';
import { LegalEntity }  from '../counterparties/legal-entity.entity';
import { Trader }       from '../counterparties/trader.entity';
import { Bond }         from '../bonds/bond.entity';

export enum TradeType {
  FX_SPOT = 'FX_SPOT',
  FX_SWAP = 'FX_SWAP',
  BOND    = 'BOND',
  REPO    = 'REPO',
  CDS     = 'CDS',
  IRS     = 'IRS',
  CCS     = 'CCS',
}

export enum TradeStatus {
  NEW       = 'NEW',
  CONFIRMED = 'CONFIRMED',
  SETTLED   = 'SETTLED',
  CANCELLED = 'CANCELLED',
  AMENDED   = 'AMENDED',
}

export enum TradeDirection {
  BUY  = 'BUY',
  SELL = 'SELL',
}

@Entity('trades')
export class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'trade_ref', unique: true })
  tradeRef: string;

  @Column({ name: 'trade_type', type: 'enum', enum: TradeType })
  tradeType: TradeType;

  @Column({ type: 'enum', enum: TradeStatus, default: TradeStatus.NEW })
  status: TradeStatus;

  @Column({ type: 'enum', enum: TradeDirection })
  direction: TradeDirection;

  @Column({ name: 'trade_date', type: 'date' })
  tradeDate: string;

  @Column({ name: 'value_date', type: 'date', nullable: true })
  valueDate: string;

  @Column({ name: 'maturity_date', type: 'date', nullable: true })
  maturityDate: string;

  @Column({ type: 'decimal', precision: 20, scale: 4, nullable: true })
  notional: number;

  @Column({ name: 'notional_currency', length: 3, nullable: true })
  notionalCurrency: string;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: true })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  yield: number;

  @Column({ name: 'currency_pair', length: 7, nullable: true })
  currencyPair: string;

  @Column({ name: 'exchange_rate', type: 'decimal', precision: 15, scale: 8, nullable: true })
  exchangeRate: number;

  @Column({ name: 'captured_amount', type: 'decimal', precision: 20, scale: 4, nullable: true })
  capturedAmount: number;

  @Column({ name: 'captured_currency', length: 3, nullable: true })
  capturedCurrency: string;

  @Column({ nullable: true })
  desk: string;

  @Column({ nullable: true, type: 'text' })
  comments: string;

  // ── Relations ────────────────────────────────────────────────
  @ManyToOne(() => Counterparty, { eager: true, nullable: true })
  @JoinColumn({ name: 'counterparty_id' })
  counterparty: Counterparty;

  @ManyToOne(() => LegalEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'legal_entity_id' })
  legalEntity: LegalEntity;

  @ManyToOne(() => Trader, { eager: true, nullable: true })
  @JoinColumn({ name: 'trader_id' })
  trader: Trader;

  @ManyToOne(() => Bond, { eager: true, nullable: true })
  @JoinColumn({ name: 'bond_id' })
  bond: Bond;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
