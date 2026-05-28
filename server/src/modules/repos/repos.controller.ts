import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReposService } from './repos.service';

@ApiTags('Repos')
@Controller('repos')
export class ReposController {
  constructor(private readonly service: ReposService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des Repos' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 50) {
    return this.service.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un Repo' })
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
