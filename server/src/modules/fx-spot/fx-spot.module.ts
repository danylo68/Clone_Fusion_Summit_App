import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from '../trades/trade.entity';
import { FxSpotService } from './fx-spot.service';
import { FxSpotController } from './fx-spot.controller';

@Module({
  imports:     [TypeOrmModule.forFeature([Trade])],
  controllers: [FxSpotController],
  providers:   [FxSpotService],
})
export class FxSpotModule {}
