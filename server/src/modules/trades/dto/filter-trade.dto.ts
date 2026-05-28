import { IsOptional, IsEnum, IsString, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TradeType, TradeStatus } from '../trade.entity';

export class FilterTradeDto {
  @ApiPropertyOptional({ enum: TradeType })
  @IsOptional() @IsEnum(TradeType)
  tradeType?: TradeType;

  @ApiPropertyOptional({ enum: TradeStatus })
  @IsOptional() @IsEnum(TradeStatus)
  status?: TradeStatus;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  desk?: string;

  @ApiPropertyOptional({ description: 'Date début (YYYY-MM-DD)' })
  @IsOptional() @IsString()
  dateFrom?: string;

  @ApiPropertyOptional({ description: 'Date fin (YYYY-MM-DD)' })
  @IsOptional() @IsString()
  dateTo?: string;

  @ApiPropertyOptional({ description: 'Recherche libre (ref, contrepartie, paire FX)' })
  @IsOptional() @IsString()
  search?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ default: 50 })
  @IsOptional()
  limit?: number = 50;
}
