import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CounterpartyType } from '../counterparty.entity';

export class FilterCounterpartyDto {
  @ApiPropertyOptional({ enum: CounterpartyType })
  @IsOptional()
  @IsEnum(CounterpartyType)
  type?: CounterpartyType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  desk?: string;
}
