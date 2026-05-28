import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Valuation } from './valuation.entity';
import { ValuationsService } from './valuations.service';
import { ValuationsController } from './valuations.controller';

@Module({
  imports:     [TypeOrmModule.forFeature([Valuation])],
  controllers: [ValuationsController],
  providers:   [ValuationsService],
  exports:     [ValuationsService, TypeOrmModule],
})
export class ValuationsModule {}
