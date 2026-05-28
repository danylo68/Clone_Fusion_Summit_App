import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from '../trades/trade.entity';
import { FxSwapService } from './fx-swap.service';
import { FxSwapController } from './fx-swap.controller';

@Module({
  imports:     [TypeOrmModule.forFeature([Trade])],
  controllers: [FxSwapController],
  providers:   [FxSwapService],
})
export class FxSwapModule {}
