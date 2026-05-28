"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DerivativesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trade_entity_1 = require("../trades/trade.entity");
const derivatives_service_1 = require("./derivatives.service");
const derivatives_controller_1 = require("./derivatives.controller");
let DerivativesModule = class DerivativesModule {
};
exports.DerivativesModule = DerivativesModule;
exports.DerivativesModule = DerivativesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([trade_entity_1.Trade])],
        controllers: [derivatives_controller_1.DerivativesController],
        providers: [derivatives_service_1.DerivativesService],
    })
], DerivativesModule);
//# sourceMappingURL=derivatives.module.js.map