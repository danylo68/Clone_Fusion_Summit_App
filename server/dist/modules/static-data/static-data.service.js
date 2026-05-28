"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticDataService = void 0;
const common_1 = require("@nestjs/common");
let StaticDataService = class StaticDataService {
    getTradeTypes() {
        return {
            items: [
                { code: 'FX_SPOT', name: 'FX Spot', description: 'Foreign Exchange Spot trade' },
                { code: 'FX_SWAP', name: 'FX Swap', description: 'Foreign Exchange Swap trade' },
                { code: 'BOND', name: 'Bond', description: 'Fixed income bond trade' },
                { code: 'REPO', name: 'Repo', description: 'Repurchase agreement' },
                { code: 'CDS', name: 'Credit Default Swap', description: 'Credit derivative' },
                { code: 'IRS', name: 'Interest Rate Swap', description: 'Interest rate derivative' },
                { code: 'CCS', name: 'Cross Currency Swap', description: 'Cross currency derivative' },
            ],
        };
    }
    getTradeStatuses() {
        return {
            items: [
                { code: 'NEW', name: 'New', description: 'Trade capturé' },
                { code: 'CONFIRMED', name: 'Confirmed', description: 'Confirmé par la contrepartie' },
                { code: 'SETTLED', name: 'Settled', description: 'Règlement effectué' },
                { code: 'CANCELLED', name: 'Cancelled', description: 'Trade annulé' },
                { code: 'AMENDED', name: 'Amended', description: 'Trade modifié' },
            ],
        };
    }
    getTaskTypes() {
        return {
            items: [
                { code: 'CONFIRMATION', name: 'Confirmation', description: 'Confirmation de trade' },
                { code: 'SETTLEMENT', name: 'Settlement', description: 'Règlement' },
                { code: 'VALUATION', name: 'Valuation', description: 'Valorisation MTM' },
                { code: 'MARGIN_CALL', name: 'Margin Call', description: 'Appel de marge' },
                { code: 'ACCOUNTING', name: 'Accounting', description: 'Comptabilisation' },
                { code: 'REPORTING', name: 'Reporting', description: 'Rapport réglementaire' },
            ],
        };
    }
    getDesks() {
        return {
            items: [
                { code: 'FX', name: 'Foreign Exchange' },
                { code: 'RATES', name: 'Rates & Fixed Income' },
                { code: 'CREDIT', name: 'Credit' },
                { code: 'EQUITY', name: 'Equity' },
            ],
        };
    }
};
exports.StaticDataService = StaticDataService;
exports.StaticDataService = StaticDataService = __decorate([
    (0, common_1.Injectable)()
], StaticDataService);
//# sourceMappingURL=static-data.service.js.map