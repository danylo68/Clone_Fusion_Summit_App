import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BondsService } from './bonds.service';
import { FilterBondDto } from './dto/filter-bond.dto';

@ApiTags('Bonds')
@Controller('bonds')
export class BondsController {
  constructor(private readonly service: BondsService) {}

  // GET /api/bonds
  @Get()
  @ApiOperation({ summary: 'Liste des obligations' })
  findAll(@Query() filter: FilterBondDto) {
    return this.service.findAll(filter);
  }

  // GET /api/bonds/isin/:isin
  @Get('isin/:isin')
  @ApiOperation({ summary: 'Obligation par ISIN' })
  findByIsin(@Param('isin') isin: string) {
    return this.service.findByIsin(isin);
  }

  // GET /api/bonds/:id
  @Get(':id')
  @ApiOperation({ summary: 'Obligation par ID' })
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
