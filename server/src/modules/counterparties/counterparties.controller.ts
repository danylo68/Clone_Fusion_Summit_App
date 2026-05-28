import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CounterpartiesService } from './counterparties.service';
import { FilterCounterpartyDto } from './dto/filter-counterparty.dto';

@ApiTags('Counterparties')
@Controller('counterparties')
export class CounterpartiesController {
  constructor(private readonly service: CounterpartiesService) {}

  // GET /api/counterparties
  @Get()
  @ApiOperation({ summary: 'Liste des contreparties' })
  findAll(@Query() filter: FilterCounterpartyDto) {
    return this.service.findAllCounterparties(filter);
  }

  // GET /api/counterparties/legal-entities
  @Get('legal-entities')
  @ApiOperation({ summary: 'Liste des entités légales' })
  findAllLegalEntities() {
    return this.service.findAllLegalEntities();
  }

  // GET /api/counterparties/traders
  @Get('traders')
  @ApiOperation({ summary: 'Liste des traders' })
  findAllTraders(@Query() filter: FilterCounterpartyDto) {
    return this.service.findAllTraders(filter);
  }

  // GET /api/counterparties/reference-sources
  @Get('reference-sources')
  @ApiOperation({ summary: 'Sources de référence disponibles' })
  getReferenceSources() {
    return this.service.getReferenceSources();
  }

  // GET /api/counterparties/:id
  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'une contrepartie' })
  findOne(@Param('id') id: string) {
    return this.service.findCounterpartyById(id);
  }

  // GET /api/counterparties/legal-entities/:id
  @Get('legal-entities/:id')
  @ApiOperation({ summary: 'Détail d\'une entité légale' })
  findOneLegalEntity(@Param('id') id: string) {
    return this.service.findLegalEntityById(id);
  }

  // GET /api/counterparties/traders/:id
  @Get('traders/:id')
  @ApiOperation({ summary: 'Détail d\'un trader' })
  findOneTrader(@Param('id') id: string) {
    return this.service.findTraderById(id);
  }
}
