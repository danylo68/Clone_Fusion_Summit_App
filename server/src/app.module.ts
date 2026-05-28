import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// ── Modules métier ───────────────────────────────────────────
import { TradesModule }       from './modules/trades/trades.module';
import { BondsModule }        from './modules/bonds/bonds.module';
import { CounterpartiesModule } from './modules/counterparties/counterparties.module';
import { TradeTasksModule }   from './modules/trade-tasks/trade-tasks.module';
import { ReposModule }        from './modules/repos/repos.module';
import { CdsModule }          from './modules/cds/cds.module';
import { DerivativesModule }  from './modules/derivatives/derivatives.module';
import { FxSpotModule }       from './modules/fx-spot/fx-spot.module';
import { FxSwapModule }       from './modules/fx-swap/fx-swap.module';
import { ValuationsModule }   from './modules/valuations/valuations.module';
import { MarketDataModule }   from './modules/market-data/market-data.module';
import { StaticDataModule }   from './modules/static-data/static-data.module';

@Module({
  imports: [
    // ── Config globale (.env) ──────────────────────────────────
    ConfigModule.forRoot({ isGlobal: true }),

    // ── PostgreSQL via TypeORM ─────────────────────────────────
   TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
}),
    // ── Modules métier ─────────────────────────────────────────
    TradesModule,
    BondsModule,
    CounterpartiesModule,
    TradeTasksModule,
    ReposModule,
    CdsModule,
    DerivativesModule,
    FxSpotModule,
    FxSwapModule,
    ValuationsModule,
    MarketDataModule,
    StaticDataModule,
  ],
})
export class AppModule {}
