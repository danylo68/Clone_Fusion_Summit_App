import { Injectable } from '@nestjs/common';

// Données statiques de référence — pas de DB

@Injectable()
export class StaticDataService {
  getTradeTypes() {
    return {
      items: [
        { code: 'FX_SPOT', name: 'FX Spot',            description: 'Foreign Exchange Spot trade' },
        { code: 'FX_SWAP', name: 'FX Swap',            description: 'Foreign Exchange Swap trade' },
        { code: 'BOND',    name: 'Bond',                description: 'Fixed income bond trade' },
        { code: 'REPO',    name: 'Repo',                description: 'Repurchase agreement' },
        { code: 'CDS',     name: 'Credit Default Swap', description: 'Credit derivative' },
        { code: 'IRS',     name: 'Interest Rate Swap',  description: 'Interest rate derivative' },
        { code: 'CCS',     name: 'Cross Currency Swap', description: 'Cross currency derivative' },
      ],
    };
  }

  getTradeStatuses() {
    return {
      items: [
        { code: 'NEW',       name: 'New',       description: 'Trade capturé' },
        { code: 'CONFIRMED', name: 'Confirmed', description: 'Confirmé par la contrepartie' },
        { code: 'SETTLED',   name: 'Settled',   description: 'Règlement effectué' },
        { code: 'CANCELLED', name: 'Cancelled', description: 'Trade annulé' },
        { code: 'AMENDED',   name: 'Amended',   description: 'Trade modifié' },
      ],
    };
  }

  getTaskTypes() {
    return {
      items: [
        { code: 'CONFIRMATION', name: 'Confirmation', description: 'Confirmation de trade' },
        { code: 'SETTLEMENT',   name: 'Settlement',   description: 'Règlement' },
        { code: 'VALUATION',    name: 'Valuation',    description: 'Valorisation MTM' },
        { code: 'MARGIN_CALL',  name: 'Margin Call',  description: 'Appel de marge' },
        { code: 'ACCOUNTING',   name: 'Accounting',   description: 'Comptabilisation' },
        { code: 'REPORTING',    name: 'Reporting',    description: 'Rapport réglementaire' },
      ],
    };
  }

  getDesks() {
    return {
      items: [
        { code: 'FX',     name: 'Foreign Exchange' },
        { code: 'RATES',  name: 'Rates & Fixed Income' },
        { code: 'CREDIT', name: 'Credit' },
        { code: 'EQUITY', name: 'Equity' },
      ],
    };
  }
}
