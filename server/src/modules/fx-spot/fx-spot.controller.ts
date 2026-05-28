import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FxSpotService } from './fx-spot.service';

@ApiTags('FX Spot')
@Controller('fx-spot')
export class FxSpotController {
  constructor(private readonly service: FxSpotService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des trades FX Spot' })
  findAll(
    @Query('counterpartyReference') ref?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ) {
    return this.service.findAll(ref, +page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un trade FX Spot' })
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
