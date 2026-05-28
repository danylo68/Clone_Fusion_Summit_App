import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ValuationsService } from './valuations.service';
import { FilterValuationDto } from './dto/filter-valuation.dto';

@ApiTags('Valuations')
@Controller('valuations')
export class ValuationsController {
  constructor(private readonly service: ValuationsService) {}

  // GET /api/valuations/portfolio
  @Get('portfolio')
  @ApiOperation({ summary: 'Résumé portefeuille — MTM total, P&L, DV01' })
  getPortfolio() {
    return this.service.getPortfolioSummary();
  }

  // GET /api/valuations/trade/:tradeId
  @Get('trade/:tradeId')
  @ApiOperation({ summary: 'Historique de valorisation d\'un trade' })
  findByTrade(@Param('tradeId') tradeId: string) {
    return this.service.findByTrade(tradeId);
  }

  // GET /api/valuations
  @Get()
  @ApiOperation({ summary: 'Valorisations du jour (ou date précisée)' })
  findAll(@Query() filter: FilterValuationDto) {
    return this.service.findAll(filter);
  }
}
