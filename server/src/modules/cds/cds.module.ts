import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from '../trades/trade.entity';
import { CdsService } from './cds.service';
import { CdsController } from './cds.controller';

@Module({
  imports:     [TypeOrmModule.forFeature([Trade])],
  controllers: [CdsController],
  providers:   [CdsService],
})
export class CdsModule {}
