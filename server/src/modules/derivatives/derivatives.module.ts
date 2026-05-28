import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from '../trades/trade.entity';
import { DerivativesService } from './derivatives.service';
import { DerivativesController } from './derivatives.controller';

@Module({
  imports:     [TypeOrmModule.forFeature([Trade])],
  controllers: [DerivativesController],
  providers:   [DerivativesService],
})
export class DerivativesModule {}
