import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Trade } from '../trades/trade.entity';

@Entity('cds_trades')
export class CdsTrade {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToOne(() => Trade)
  @JoinColumn({ name: 'trade_id' })
  trade: Trade;

  @Column({ name: 'reference_entity' })
  referenceEntity: string;

  @Column({ name: 'reference_obligation_isin', nullable: true })
  referenceObligationIsin: string;

  @Column({ type: 'decimal', precision: 20, scale: 4 })
  notional: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ name: 'spread_bps', type: 'decimal', precision: 10, scale: 4 })
  spreadBps: number;

  @Column({ name: 'premium_leg' })
  premiumLeg: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'maturity_date', type: 'date' })
  maturityDate: string;

  @Column({ name: 'restructuring_type', default: 'CR' })
  restructuringType: string;

  @Column({ name: 'recovery_rate', type: 'decimal', precision: 8, scale: 4, default: 0.40 })
  recoveryRate: number;
}
