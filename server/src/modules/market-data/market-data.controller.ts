import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MarketDataService } from './market-data.service';
import { InstrumentType } from './market-data.entity';

@ApiTags('Market Data')
@Controller('market-data')
export class MarketDataController {
  constructor(private readonly service: MarketDataService) {}

  // GET /api/market-data/fx-rates
  @Get('fx-rates')
  @ApiOperation({ summary: 'Taux de change FX' })
  getFxRates(@Query('date') date?: string) {
    return this.service.findByType(InstrumentType.FX, date);
  }

  // GET /api/market-data/rates
  @Get('rates')
  @ApiOperation({ summary: 'Taux d\'intérêt (EURIBOR, SOFR, SONIA...)' })
  getRates(@Query('date') date?: string) {
    return this.service.findByType(InstrumentType.RATE, date);
  }

  // GET /api/market-data/credit-spreads
  @Get('credit-spreads')
  @ApiOperation({ summary: 'Spreads de crédit (iTraxx, CDX...)' })
  getCreditSpreads(@Query('date') date?: string) {
    return this.service.findByType(InstrumentType.CREDIT_SPREAD, date);
  }

  // GET /api/market-data/bond-prices
  @Get('bond-prices')
  @ApiOperation({ summary: 'Prix des obligations' })
  getBondPrices(@Query('date') date?: string) {
    return this.service.findByType(InstrumentType.BOND_PRICE, date);
  }

  // GET /api/market-data/ticker/:ticker
  @Get('ticker/:ticker')
  @ApiOperation({ summary: 'Historique d\'un ticker (30 jours)' })
  findByTicker(@Param('ticker') ticker: string) {
    return this.service.findByTicker(ticker);
  }

  // GET /api/market-data
  @Get()
  @ApiOperation({ summary: 'Toutes les données marché du jour' })
  findAll(@Query('date') date?: string) {
    return this.service.findAll(date);
  }
}
