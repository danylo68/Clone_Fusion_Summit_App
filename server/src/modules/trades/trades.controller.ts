import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TradesService } from './trades.service';
import { FilterTradeDto } from './dto/filter-trade.dto';

@ApiTags('Trades')
@Controller('trades')
export class TradesController {
  constructor(private readonly service: TradesService) {}

  // GET /api/trades/stats
  @Get('stats')
  @ApiOperation({ summary: 'Statistiques globales des trades' })
  getStats() {
    return this.service.getStats();
  }

  // GET /api/trades
  @Get()
  @ApiOperation({ summary: 'Trade blotter — liste avec filtres et pagination' })
  findAll(@Query() filter: FilterTradeDto) {
    return this.service.findAll(filter);
  }

  // GET /api/trades/:id
  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un trade' })
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
