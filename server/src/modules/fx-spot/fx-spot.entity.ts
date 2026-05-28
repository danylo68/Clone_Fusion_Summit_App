import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Trade } from '../trades/trade.entity';

@Entity('fx_spot_trades')
export class FxSpotTrade {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToOne(() => Trade)
  @JoinColumn({ name: 'trade_id' })
  trade: Trade;

  @Column({ name: 'currency_pair', length: 7 }) currencyPair: string;
  @Column() direction: string;
  @Column({ name: 'captured_amount', type: 'decimal', precision: 20, scale: 4 }) capturedAmount: number;
  @Column({ name: 'captured_currency', length: 3 }) capturedCurrency: string;
  @Column({ name: 'exchange_rate', type: 'decimal', precision: 15, scale: 8 }) exchangeRate: number;
  @Column({ name: 'settlement_date', type: 'date' }) settlementDate: string;
}
