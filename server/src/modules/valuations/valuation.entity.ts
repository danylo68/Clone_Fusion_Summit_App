import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn, Unique,
} from 'typeorm';
import { Trade } from '../trades/trade.entity';

@Entity('valuations')
@Unique(['trade', 'valuationDate'])
export class Valuation {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Trade, { eager: true })
  @JoinColumn({ name: 'trade_id' })
  trade: Trade;

  @Column({ name: 'valuation_date', type: 'date' })
  valuationDate: string;

  @Column({ type: 'decimal', precision: 20, scale: 4, nullable: true })
  mtm: number;

  @Column({ name: 'day_pnl', type: 'decimal', precision: 20, scale: 4, nullable: true })
  dayPnl: number;

  @Column({ name: 'total_pnl', type: 'decimal', precision: 20, scale: 4, nullable: true })
  totalPnl: number;

  @Column({ type: 'decimal', precision: 20, scale: 6, nullable: true })
  dv01: number;

  @Column({ name: 'accrued_interest', type: 'decimal', precision: 20, scale: 4, nullable: true })
  accruedInterest: number;

  @Column({ name: 'dirty_price', type: 'decimal', precision: 15, scale: 8, nullable: true })
  dirtyPrice: number;

  @Column({ name: 'clean_price', type: 'decimal', precision: 15, scale: 8, nullable: true })
  cleanPrice: number;

  @Column({ length: 3, default: 'EUR' })
  currency: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
