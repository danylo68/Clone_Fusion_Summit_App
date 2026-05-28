import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Trade } from '../trades/trade.entity';

@Entity('fx_swap_trades')
export class FxSwapTrade {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToOne(() => Trade)
  @JoinColumn({ name: 'trade_id' })
  trade: Trade;

  @Column({ name: 'currency_pair', length: 7 }) currencyPair: string;
  @Column() direction: string;
  @Column({ name: 'captured_near_amount', type: 'decimal', precision: 20, scale: 4 }) capturedNearAmount: number;
  @Column({ name: 'captured_currency', length: 3 }) capturedCurrency: string;
  @Column({ name: 'exchange_rate', type: 'decimal', precision: 15, scale: 8 }) exchangeRate: number;
  @Column({ name: 'spot_margin', type: 'decimal', precision: 10, scale: 4, nullable: true }) spotMargin: number;
  @Column({ name: 'far_exchange_rate', type: 'decimal', precision: 15, scale: 8 }) farExchangeRate: number;
  @Column({ name: 'far_margin', type: 'decimal', precision: 10, scale: 4, nullable: true }) farMargin: number;
  @Column({ name: 'near_settlement_date', type: 'date' }) nearSettlementDate: string;
  @Column({ name: 'far_settlement_date', type: 'date' }) farSettlementDate: string;
}
