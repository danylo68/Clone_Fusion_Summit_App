import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StaticDataService } from './static-data.service';

@ApiTags('Static Data')
@Controller('static-data')
export class StaticDataController {
  constructor(private readonly service: StaticDataService) {}

  // GET /api/static-data/trade-types
  @Get('trade-types')
  @ApiOperation({ summary: 'Types de trades disponibles' })
  getTradeTypes() {
    return this.service.getTradeTypes();
  }

  // GET /api/static-data/trade-statuses
  @Get('trade-statuses')
  @ApiOperation({ summary: 'Statuts de trades disponibles' })
  getTradeStatuses() {
    return this.service.getTradeStatuses();
  }

  // GET /api/static-data/task-types
  @Get('task-types')
  @ApiOperation({ summary: 'Types de tâches back/middle office' })
  getTaskTypes() {
    return this.service.getTaskTypes();
  }

  // GET /api/static-data/desks
  @Get('desks')
  @ApiOperation({ summary: 'Desks de trading' })
  getDesks() {
    return this.service.getDesks();
  }
}
