import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DerivativesService } from './derivatives.service';

@ApiTags('Derivatives')
@Controller('derivatives')
export class DerivativesController {
  constructor(private readonly service: DerivativesService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des dérivés IRS et CCS' })
  findAll(
    @Query('type') type?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ) {
    return this.service.findAll(type, +page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un dérivé' })
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
