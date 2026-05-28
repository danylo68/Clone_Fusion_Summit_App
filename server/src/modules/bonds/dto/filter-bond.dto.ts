import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterBondDto {
  @ApiPropertyOptional({ description: 'Code pays ISO (FRA, DEU, USA...)' })
  @IsOptional() @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Secteur (SOVEREIGN, FINANCIAL, CORPORATE...)' })
  @IsOptional() @IsString()
  sector?: string;

  @ApiPropertyOptional({ description: 'Type (FIXED, FLOATING, ZERO_COUPON)' })
  @IsOptional() @IsString()
  type?: string;
}
