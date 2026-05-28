import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bond } from './bond.entity';
import { BondsService } from './bonds.service';
import { BondsController } from './bonds.controller';

@Module({
  imports:     [TypeOrmModule.forFeature([Bond])],
  controllers: [BondsController],
  providers:   [BondsService],
  exports:     [BondsService, TypeOrmModule],
})
export class BondsModule {}
