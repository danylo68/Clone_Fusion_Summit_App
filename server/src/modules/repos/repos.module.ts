import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from '../trades/trade.entity';
import { ReposService } from './repos.service';
import { ReposController } from './repos.controller';

@Module({
  imports:     [TypeOrmModule.forFeature([Trade])],
  controllers: [ReposController],
  providers:   [ReposService],
})
export class ReposModule {}
