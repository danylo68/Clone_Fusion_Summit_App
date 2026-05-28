import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeTask } from './trade-task.entity';
import { TradeTasksService } from './trade-tasks.service';
import { TradeTasksController } from './trade-tasks.controller';

@Module({
  imports:     [TypeOrmModule.forFeature([TradeTask])],
  controllers: [TradeTasksController],
  providers:   [TradeTasksService],
  exports:     [TradeTasksService, TypeOrmModule],
})
export class TradeTasksModule {}
