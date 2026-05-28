import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Trade } from '../trades/trade.entity';
import { Bond } from '../bonds/bond.entity';

@Entity('repo_trades')
export class RepoTrade {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToOne(() => Trade)
  @JoinColumn({ name: 'trade_id' })
  trade: Trade;

  @ManyToOne(() => Bond, { nullable: true })
  @JoinColumn({ name: 'bond_id' })
  bond: Bond;

  @Column({ name: 'repo_type', default: 'REPO' })
  repoType: string;

  @Column({ type: 'decimal', precision: 20, scale: 4 })
  notional: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ name: 'repo_rate', type: 'decimal', precision: 10, scale: 6 })
  repoRate: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date' })
  endDate: string;

  @Column({ type: 'decimal', precision: 8, scale: 4, default: 0 })
  haircut: number;

  @Column({ name: 'collateral_isin', nullable: true })
  collateralIsin: string;
}
