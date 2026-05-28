import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CdsService } from './cds.service';

@ApiTags('CDS')
@Controller('cds')
export class CdsController {
  constructor(private readonly service: CdsService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des CDS' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 50) {
    return this.service.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un CDS' })
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
