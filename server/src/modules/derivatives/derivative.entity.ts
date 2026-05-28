import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Trade } from '../trades/trade.entity';

@Entity('derivative_trades')
export class DerivativeTrade {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToOne(() => Trade)
  @JoinColumn({ name: 'trade_id' })
  trade: Trade;

  @Column({ name: 'derivative_type' }) derivativeType: string;
  @Column({ type: 'decimal', precision: 20, scale: 4 }) notional: number;
  @Column({ length: 3 }) currency: string;
  @Column({ name: 'pay_leg_type' }) payLegType: string;
  @Column({ name: 'pay_rate', type: 'decimal', precision: 10, scale: 6, nullable: true }) payRate: number;
  @Column({ name: 'pay_frequency', nullable: true }) payFrequency: string;
  @Column({ name: 'receive_leg_type' }) receiveLegType: string;
  @Column({ name: 'receive_rate', type: 'decimal', precision: 10, scale: 6, nullable: true }) receiveRate: number;
  @Column({ name: 'receive_frequency', nullable: true }) receiveFrequency: string;
  @Column({ name: 'floating_index', nullable: true }) floatingIndex: string;
  @Column({ name: 'start_date', type: 'date' }) startDate: string;
  @Column({ name: 'maturity_date', type: 'date' }) maturityDate: string;
  @Column({ name: 'day_count', default: 'ACT/360' }) dayCount: string;
}
