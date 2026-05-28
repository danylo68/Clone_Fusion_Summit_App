import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FxSwapService } from './fx-swap.service';

@ApiTags('FX Swap')
@Controller('fx-swap')
export class FxSwapController {
  constructor(private readonly service: FxSwapService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des trades FX Swap' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 50) {
    return this.service.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un trade FX Swap' })
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
