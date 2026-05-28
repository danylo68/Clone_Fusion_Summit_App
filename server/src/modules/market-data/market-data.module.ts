import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketData } from './market-data.entity';
import { MarketDataService } from './market-data.service';
import { MarketDataController } from './market-data.controller';

@Module({
  imports:     [TypeOrmModule.forFeature([MarketData])],
  controllers: [MarketDataController],
  providers:   [MarketDataService],
  exports:     [MarketDataService, TypeOrmModule],
})
export class MarketDataModule {}
