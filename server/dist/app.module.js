"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const trades_module_1 = require("./modules/trades/trades.module");
const bonds_module_1 = require("./modules/bonds/bonds.module");
const counterparties_module_1 = require("./modules/counterparties/counterparties.module");
const trade_tasks_module_1 = require("./modules/trade-tasks/trade-tasks.module");
const repos_module_1 = require("./modules/repos/repos.module");
const cds_module_1 = require("./modules/cds/cds.module");
const derivatives_module_1 = require("./modules/derivatives/derivatives.module");
const fx_spot_module_1 = require("./modules/fx-spot/fx-spot.module");
const fx_swap_module_1 = require("./modules/fx-swap/fx-swap.module");
const valuations_module_1 = require("./modules/valuations/valuations.module");
const market_data_module_1 = require("./modules/market-data/market-data.module");
const static_data_module_1 = require("./modules/static-data/static-data.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                ssl: { rejectUnauthorized: false },
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: process.env.NODE_ENV !== 'production',
                logging: process.env.NODE_ENV === 'development',
            }),
            trades_module_1.TradesModule,
            bonds_module_1.BondsModule,
            counterparties_module_1.CounterpartiesModule,
            trade_tasks_module_1.TradeTasksModule,
            repos_module_1.ReposModule,
            cds_module_1.CdsModule,
            derivatives_module_1.DerivativesModule,
            fx_spot_module_1.FxSpotModule,
            fx_swap_module_1.FxSwapModule,
            valuations_module_1.ValuationsModule,
            market_data_module_1.MarketDataModule,
            static_data_module_1.StaticDataModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map