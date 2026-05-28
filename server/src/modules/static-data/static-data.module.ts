import { Module } from '@nestjs/common';
import { StaticDataService } from './static-data.service';
import { StaticDataController } from './static-data.controller';

@Module({
  controllers: [StaticDataController],
  providers:   [StaticDataService],
})
export class StaticDataModule {}
