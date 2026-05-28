"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FxSpotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trade_entity_1 = require("../trades/trade.entity");
const fx_spot_service_1 = require("./fx-spot.service");
const fx_spot_controller_1 = require("./fx-spot.controller");
let FxSpotModule = class FxSpotModule {
};
exports.FxSpotModule = FxSpotModule;
exports.FxSpotModule = FxSpotModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([trade_entity_1.Trade])],
        controllers: [fx_spot_controller_1.FxSpotController],
        providers: [fx_spot_service_1.FxSpotService],
    })
], FxSpotModule);
//# sourceMappingURL=fx-spot.module.js.map