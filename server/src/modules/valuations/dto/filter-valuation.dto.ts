import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterValuationDto {
  @ApiPropertyOptional({ description: 'Date de valorisation (YYYY-MM-DD), défaut = aujourd\'hui' })
  @IsOptional() @IsString()
  date?: string;
}
