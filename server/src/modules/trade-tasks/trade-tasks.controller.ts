import { Controller, Get, Param, Query, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TradeTasksService } from './trade-tasks.service';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Trade Tasks')
@Controller('trade-tasks')
export class TradeTasksController {
  constructor(private readonly service: TradeTasksService) {}

  // GET /api/trade-tasks/dashboard
  @Get('dashboard')
  @ApiOperation({ summary: 'Dashboard back/middle office — stats par type et statut' })
  getDashboard() {
    return this.service.getDashboard();
  }

  // GET /api/trade-tasks
  @Get()
  @ApiOperation({ summary: 'File de tâches back/middle office' })
  findAll(@Query() filter: FilterTaskDto) {
    return this.service.findAll(filter);
  }

  // PATCH /api/trade-tasks/:id/status
  @Patch(':id/status')
  @ApiOperation({ summary: 'Mettre à jour le statut d\'une tâche' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.service.updateStatus(id, dto);
  }
}
