"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const between = (min, max, dec = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(dec));
const randDate = (startY, endY) => {
    const s = new Date(startY, 0, 1).getTime();
    const e = new Date(endY, 11, 31).getTime();
    return new Date(s + Math.random() * (e - s)).toISOString().split('T')[0];
};
const addDays = (d, n) => {
    const dt = new Date(d);
    dt.setDate(dt.getDate() + n);
    return dt.toISOString().split('T')[0];
};
const pad = (n) => String(n).padStart(7, '0');
const statusWeighted = () => {
    const r = Math.random();
    if (r < 0.10)
        return 'NEW';
    if (r < 0.40)
        return 'CONFIRMED';
    if (r < 0.85)
        return 'SETTLED';
    if (r < 0.90)
        return 'CANCELLED';
    return 'AMENDED';
};
const COUNTERPARTIES = [
    { reference: 'BNP-R', name: 'BNP Paribas', country: 'FRA', city: 'Paris', type: 'BANK', credit_rating: 'AA-' },
    { reference: 'SOCGEN', name: 'Société Générale', country: 'FRA', city: 'Paris', type: 'BANK', credit_rating: 'A+' },
    { reference: 'DBFM', name: 'Deutsche Bank', country: 'DEU', city: 'Frankfurt', type: 'BANK', credit_rating: 'BBB+' },
    { reference: 'HSBC-LDN', name: 'HSBC London', country: 'GBR', city: 'London', type: 'BANK', credit_rating: 'AA-' },
    { reference: 'JPM-NY', name: 'JPMorgan Chase', country: 'USA', city: 'New York', type: 'BANK', credit_rating: 'A+' },
    { reference: 'GS-NY', name: 'Goldman Sachs', country: 'USA', city: 'New York', type: 'BANK', credit_rating: 'A+' },
    { reference: 'UBS-ZH', name: 'UBS Zurich', country: 'CHE', city: 'Zurich', type: 'BANK', credit_rating: 'A+' },
    { reference: 'CITI-LDN', name: 'Citibank London', country: 'GBR', city: 'London', type: 'BANK', credit_rating: 'A' },
    { reference: 'BARC-LDN', name: 'Barclays London', country: 'GBR', city: 'London', type: 'BANK', credit_rating: 'A-' },
    { reference: 'ING-AMS', name: 'ING Amsterdam', country: 'NLD', city: 'Amsterdam', type: 'BANK', credit_rating: 'A' },
    { reference: 'CALYON', name: 'Crédit Agricole CIB', country: 'FRA', city: 'Paris', type: 'BANK', credit_rating: 'A+' },
    { reference: 'NATX', name: 'Natixis', country: 'FRA', city: 'Paris', type: 'BANK', credit_rating: 'A' },
    { reference: 'BLCK-NY', name: 'BlackRock', country: 'USA', city: 'New York', type: 'HEDGE_FUND', credit_rating: 'AAA' },
    { reference: 'BRID-CT', name: 'Bridgewater Associates', country: 'USA', city: 'Westport', type: 'HEDGE_FUND', credit_rating: 'AA' },
    { reference: 'CALPERS', name: 'CalPERS', country: 'USA', city: 'Sacramento', type: 'PENSION_FUND', credit_rating: 'AAA' },
    { reference: 'ABP-NL', name: 'ABP Netherlands', country: 'NLD', city: 'Heerlen', type: 'PENSION_FUND', credit_rating: 'AAA' },
    { reference: 'GIVAUDAN', name: 'Givaudan SA', country: 'CHE', city: 'Geneva', type: 'CORPORATE', credit_rating: 'A' },
    { reference: 'MOD-BANK', name: 'Model Bank', country: 'FRA', city: 'Paris', type: 'BANK', credit_rating: 'A' },
    { reference: 'MIZUHO', name: 'Mizuho Bank', country: 'JPN', city: 'Tokyo', type: 'BANK', credit_rating: 'A' },
    { reference: 'SMBC', name: 'Sumitomo Mitsui', country: 'JPN', city: 'Tokyo', type: 'BANK', credit_rating: 'A+' },
];
const LEGAL_ENTITIES = [
    { reference: 'FOLDER_1', name: 'Kondor Capital EU', country: 'FRA', currency: 'EUR' },
    { reference: 'KAP-IF1', name: 'Kondor IF1', country: 'FRA', currency: 'EUR' },
    { reference: 'KOND-LDN', name: 'Kondor London', country: 'GBR', currency: 'GBP' },
    { reference: 'KOND-NYC', name: 'Kondor New York', country: 'USA', currency: 'USD' },
    { reference: 'KOND-ZH', name: 'Kondor Zurich', country: 'CHE', currency: 'CHF' },
];
const TRADERS = [
    { reference: 'KPLUS', first_name: 'Karl', last_name: 'Plusmann', desk: 'FX' },
    { reference: 'JDUPONT', first_name: 'Jean', last_name: 'Dupont', desk: 'RATES' },
    { reference: 'SMARTIN', first_name: 'Sophie', last_name: 'Martin', desk: 'CREDIT' },
    { reference: 'PBOYER', first_name: 'Pierre', last_name: 'Boyer', desk: 'FX' },
    { reference: 'LRICHARD', first_name: 'Lucie', last_name: 'Richard', desk: 'RATES' },
    { reference: 'TMOREAU', first_name: 'Thomas', last_name: 'Moreau', desk: 'CREDIT' },
    { reference: 'ALEVY', first_name: 'Alice', last_name: 'Levy', desk: 'FX' },
    { reference: 'BSMITH', first_name: 'Brian', last_name: 'Smith', desk: 'RATES' },
    { reference: 'CCHEN', first_name: 'Chen', last_name: 'Wei', desk: 'EQUITY' },
    { reference: 'MMULLER', first_name: 'Max', last_name: 'Müller', desk: 'FX' },
];
const BONDS_DATA = [
    { isin: 'FR0013131877', ticker: 'OAT 0.5 2025', issuer: 'Republic of France', currency: 'EUR', coupon_rate: 0.005, coupon_frequency: 'ANNUAL', issue_date: '2015-05-25', maturity_date: '2025-11-25', rating: 'AA', country: 'FRA', sector: 'SOVEREIGN', type: 'FIXED' },
    { isin: 'FR0010070060', ticker: 'OAT 4.0 2055', issuer: 'Republic of France', currency: 'EUR', coupon_rate: 0.040, coupon_frequency: 'ANNUAL', issue_date: '2004-04-16', maturity_date: '2055-04-25', rating: 'AA', country: 'FRA', sector: 'SOVEREIGN', type: 'FIXED' },
    { isin: 'DE0001102580', ticker: 'DBR 0.0 2030', issuer: 'Federal Republic of Germany', currency: 'EUR', coupon_rate: 0.0, coupon_frequency: 'ANNUAL', issue_date: '2020-07-09', maturity_date: '2030-08-15', rating: 'AAA', country: 'DEU', sector: 'SOVEREIGN', type: 'ZERO_COUPON' },
    { isin: 'DE0001135525', ticker: 'DBR 3.25 2042', issuer: 'Federal Republic of Germany', currency: 'EUR', coupon_rate: 0.0325, coupon_frequency: 'ANNUAL', issue_date: '2012-01-04', maturity_date: '2042-07-04', rating: 'AAA', country: 'DEU', sector: 'SOVEREIGN', type: 'FIXED' },
    { isin: 'IT0005240350', ticker: 'BTPS 2.2 2027', issuer: 'Republic of Italy', currency: 'EUR', coupon_rate: 0.022, coupon_frequency: 'SEMI_ANNUAL', issue_date: '2017-03-14', maturity_date: '2027-06-01', rating: 'BBB', country: 'ITA', sector: 'SOVEREIGN', type: 'FIXED' },
    { isin: 'IT0005367492', ticker: 'BTPS 3.35 2035', issuer: 'Republic of Italy', currency: 'EUR', coupon_rate: 0.0335, coupon_frequency: 'SEMI_ANNUAL', issue_date: '2019-09-13', maturity_date: '2035-03-01', rating: 'BBB', country: 'ITA', sector: 'SOVEREIGN', type: 'FIXED' },
    { isin: 'ES00000128Y5', ticker: 'SPGB 1.45 2029', issuer: 'Kingdom of Spain', currency: 'EUR', coupon_rate: 0.0145, coupon_frequency: 'ANNUAL', issue_date: '2019-05-17', maturity_date: '2029-10-31', rating: 'A-', country: 'ESP', sector: 'SOVEREIGN', type: 'FIXED' },
    { isin: 'GB00B54HL833', ticker: 'UKT 1.75 2037', issuer: 'United Kingdom', currency: 'GBP', coupon_rate: 0.0175, coupon_frequency: 'SEMI_ANNUAL', issue_date: '2011-09-14', maturity_date: '2037-09-07', rating: 'AA', country: 'GBR', sector: 'SOVEREIGN', type: 'FIXED' },
    { isin: 'US912810TM62', ticker: 'T 2.875 2046', issuer: 'US Treasury', currency: 'USD', coupon_rate: 0.02875, coupon_frequency: 'SEMI_ANNUAL', issue_date: '2016-08-15', maturity_date: '2046-08-15', rating: 'AA+', country: 'USA', sector: 'SOVEREIGN', type: 'FIXED' },
    { isin: 'XS1400432083', ticker: 'BNP 1.125 2026', issuer: 'BNP Paribas', currency: 'EUR', coupon_rate: 0.01125, coupon_frequency: 'ANNUAL', issue_date: '2016-05-25', maturity_date: '2026-05-25', rating: 'A+', country: 'FRA', sector: 'FINANCIAL', type: 'FIXED' },
    { isin: 'XS1843443789', ticker: 'SOCGEN 1.0 2025', issuer: 'Société Générale', currency: 'EUR', coupon_rate: 0.01, coupon_frequency: 'ANNUAL', issue_date: '2018-06-07', maturity_date: '2025-06-07', rating: 'A', country: 'FRA', sector: 'FINANCIAL', type: 'FIXED' },
    { isin: 'XS2234567890', ticker: 'ENGIE 0.875 2031', issuer: 'Engie', currency: 'EUR', coupon_rate: 0.00875, coupon_frequency: 'ANNUAL', issue_date: '2021-06-09', maturity_date: '2031-06-09', rating: 'A-', country: 'FRA', sector: 'UTILITIES', type: 'FIXED' },
    { isin: 'XS2345678901', ticker: 'TOTAL 1.49 2027', issuer: 'TotalEnergies', currency: 'EUR', coupon_rate: 0.0149, coupon_frequency: 'ANNUAL', issue_date: '2020-07-24', maturity_date: '2027-07-24', rating: 'A', country: 'FRA', sector: 'ENERGY', type: 'FIXED' },
    { isin: 'XS2456789012', ticker: 'VWAG 0.75 2026', issuer: 'Volkswagen AG', currency: 'EUR', coupon_rate: 0.0075, coupon_frequency: 'ANNUAL', issue_date: '2021-01-14', maturity_date: '2026-01-14', rating: 'BBB+', country: 'DEU', sector: 'AUTOMOTIVE', type: 'FIXED' },
];
const MARKET_DATA_SEEDS = [
    { instrument_type: 'FX', ticker: 'EURUSD', value: 1.0921, currency: 'USD', tenor: null },
    { instrument_type: 'FX', ticker: 'EURGBP', value: 0.8534, currency: 'GBP', tenor: null },
    { instrument_type: 'FX', ticker: 'EURJPY', value: 161.45, currency: 'JPY', tenor: null },
    { instrument_type: 'FX', ticker: 'EURCHF', value: 0.9512, currency: 'CHF', tenor: null },
    { instrument_type: 'FX', ticker: 'GBPUSD', value: 1.2795, currency: 'USD', tenor: null },
    { instrument_type: 'FX', ticker: 'USDJPY', value: 147.82, currency: 'JPY', tenor: null },
    { instrument_type: 'RATE', ticker: 'EURIBOR_3M', value: 3.845, currency: 'EUR', tenor: '3M' },
    { instrument_type: 'RATE', ticker: 'EURIBOR_6M', value: 3.712, currency: 'EUR', tenor: '6M' },
    { instrument_type: 'RATE', ticker: 'EURIBOR_12M', value: 3.521, currency: 'EUR', tenor: '12M' },
    { instrument_type: 'RATE', ticker: 'EUR_SWAP_2Y', value: 3.125, currency: 'EUR', tenor: '2Y' },
    { instrument_type: 'RATE', ticker: 'EUR_SWAP_5Y', value: 2.987, currency: 'EUR', tenor: '5Y' },
    { instrument_type: 'RATE', ticker: 'EUR_SWAP_10Y', value: 2.845, currency: 'EUR', tenor: '10Y' },
    { instrument_type: 'RATE', ticker: 'EUR_SWAP_30Y', value: 2.612, currency: 'EUR', tenor: '30Y' },
    { instrument_type: 'RATE', ticker: 'USD_SOFR', value: 5.312, currency: 'USD', tenor: 'ON' },
    { instrument_type: 'RATE', ticker: 'GBP_SONIA', value: 5.192, currency: 'GBP', tenor: 'ON' },
    { instrument_type: 'CREDIT_SPREAD', ticker: 'ITRAX_MAIN_5Y', value: 68.5, currency: null, tenor: '5Y' },
    { instrument_type: 'CREDIT_SPREAD', ticker: 'ITRAX_XOVER_5Y', value: 312.4, currency: null, tenor: '5Y' },
    { instrument_type: 'CREDIT_SPREAD', ticker: 'CDX_IG_5Y', value: 58.2, currency: null, tenor: '5Y' },
    { instrument_type: 'BOND_PRICE', ticker: 'OAT 0.5 2025', value: 99.12, currency: 'EUR', tenor: null },
    { instrument_type: 'BOND_PRICE', ticker: 'DBR 0.0 2030', value: 91.45, currency: 'EUR', tenor: null },
    { instrument_type: 'BOND_PRICE', ticker: 'BTPS 2.2 2027', value: 98.34, currency: 'EUR', tenor: null },
    { instrument_type: 'BOND_PRICE', ticker: 'UKT 1.75 2037', value: 87.23, currency: 'GBP', tenor: null },
    { instrument_type: 'BOND_PRICE', ticker: 'T 2.875 2046', value: 88.94, currency: 'USD', tenor: null },
];
const FX_PAIRS = ['EURUSD', 'EURGBP', 'EURJPY', 'EURCHF', 'GBPUSD', 'USDJPY'];
const DIRECTIONS = ['BUY', 'SELL'];
const FLOATING_INDEXES = ['EURIBOR_3M', 'EURIBOR_6M', 'SOFR', 'SONIA'];
const REFERENCE_ENTITIES = [
    'Société Générale', 'Deutsche Bank', 'BNP Paribas', 'UniCredit',
    'Air France KLM', 'Renault', 'Volkswagen', 'Telecom Italia',
    'Greece Government', 'Italy Government', 'Portugal Government',
];
const TASK_TYPES = ['CONFIRMATION', 'SETTLEMENT', 'VALUATION', 'MARGIN_CALL', 'ACCOUNTING', 'REPORTING'];
const TASK_STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'OVERDUE'];
const TASK_PRIORITIES = ['LOW', 'NORMAL', 'HIGH', 'CRITICAL'];
const TASK_WEIGHTS = [0.3, 0.15, 0.35, 0.1, 0.1];
const MIDDLE_OFFICE = ['moffice1', 'moffice2', 'backoffice1', 'backoffice2', 'ops_lead'];
function weightedStatus(weights, values) {
    const r = Math.random();
    let c = 0;
    for (let i = 0; i < weights.length; i++) {
        c += weights[i];
        if (r < c)
            return values[i];
    }
    return values[0];
}
async function runSeed() {
    await AppDataSource.initialize();
    const db = AppDataSource;
    const today = new Date().toISOString().split('T')[0];
    console.log('🌱 Démarrage du seed Fusion Summit...');
    console.log('  → Insertion des contreparties...');
    const cptyIds = {};
    for (const c of COUNTERPARTIES) {
        const [row] = await db.query(`INSERT INTO counterparties (reference, name, country, city, type, credit_rating)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (reference) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`, [c.reference, c.name, c.country, c.city, c.type, c.credit_rating]);
        cptyIds[c.reference] = row.id;
    }
    console.log('  → Insertion des entités légales...');
    const leIds = {};
    for (const le of LEGAL_ENTITIES) {
        const [row] = await db.query(`INSERT INTO legal_entities (reference, name, country, currency)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (reference) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`, [le.reference, le.name, le.country, le.currency]);
        leIds[le.reference] = row.id;
    }
    console.log('  → Insertion des traders...');
    const traderIds = {};
    for (const t of TRADERS) {
        const [row] = await db.query(`INSERT INTO traders (reference, first_name, last_name, desk)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (reference) DO UPDATE SET desk = EXCLUDED.desk
       RETURNING id`, [t.reference, t.first_name, t.last_name, t.desk]);
        traderIds[t.reference] = row.id;
    }
    console.log('  → Insertion des obligations...');
    const bondIds = {};
    for (const b of BONDS_DATA) {
        const [row] = await db.query(`INSERT INTO bonds (isin, ticker, issuer, currency, coupon_rate, coupon_frequency, issue_date, maturity_date, rating, country, sector, type)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (isin) DO UPDATE SET ticker = EXCLUDED.ticker
       RETURNING id`, [b.isin, b.ticker, b.issuer, b.currency, b.coupon_rate, b.coupon_frequency, b.issue_date, b.maturity_date, b.rating, b.country, b.sector, b.type]);
        bondIds[b.isin] = row.id;
    }
    console.log('  → Insertion des données marché...');
    for (const m of MARKET_DATA_SEEDS) {
        await db.query(`INSERT INTO market_data (instrument_type, ticker, value, currency, tenor, as_of_date)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (ticker, as_of_date) DO UPDATE SET value = EXCLUDED.value`, [m.instrument_type, m.ticker, m.value, m.currency, m.tenor, today]);
    }
    console.log('  → Génération de 2000 trades...');
    const DISTRIBUTION = [
        { type: 'FX_SPOT', count: 500, desk: 'FX' },
        { type: 'FX_SWAP', count: 400, desk: 'FX' },
        { type: 'BOND', count: 350, desk: 'RATES' },
        { type: 'REPO', count: 300, desk: 'RATES' },
        { type: 'CDS', count: 200, desk: 'CREDIT' },
        { type: 'IRS', count: 150, desk: 'RATES' },
        { type: 'CCS', count: 100, desk: 'RATES' },
    ];
    let tradeIndex = 1;
    const cptyKeys = Object.keys(cptyIds);
    const leKeys = Object.keys(leIds);
    const traderKeys = Object.keys(traderIds);
    const bondKeys = Object.keys(bondIds);
    for (const { type, count, desk } of DISTRIBUTION) {
        const prefix = { FX_SPOT: 'FXS', FX_SWAP: 'FXW', BOND: 'BON', REPO: 'RPO', CDS: 'CDS', IRS: 'IRS', CCS: 'CCS' }[type];
        for (let i = 0; i < count; i++) {
            const tradeRef = `${prefix}${pad(tradeIndex++)}`;
            const tradeDate = randDate(2023, 2026);
            const status = statusWeighted();
            const direction = rand(DIRECTIONS);
            const cptyId = cptyIds[rand(cptyKeys)];
            const leId = leIds[rand(leKeys)];
            const traderId = traderIds[rand(traderKeys)];
            let extra = {};
            if (type === 'FX_SPOT' || type === 'FX_SWAP') {
                const pair = rand(FX_PAIRS);
                extra = { currency_pair: pair, exchange_rate: between(0.8, 1.5, 6), captured_amount: between(100000, 50000000), captured_currency: pair.slice(0, 3), notional: between(100000, 50000000), notional_currency: pair.slice(0, 3), value_date: addDays(tradeDate, 2) };
            }
            else if (type === 'BOND' || type === 'REPO') {
                const bondIsin = rand(bondKeys);
                const bondData = BONDS_DATA.find(b => b.isin === bondIsin);
                extra = { notional: between(500000, 50000000, 0), notional_currency: bondData.currency, price: between(85, 115, 6), yield: between(0.5, 6, 4), bond_id: bondIds[bondIsin], value_date: addDays(tradeDate, 3), maturity_date: bondData.maturity_date };
            }
            else if (type === 'CDS') {
                extra = { notional: between(1000000, 100000000, 0), notional_currency: 'EUR', maturity_date: addDays(tradeDate, between(365, 1825, 0)) };
            }
            else {
                extra = { notional: between(5000000, 500000000, 0), notional_currency: type === 'CCS' ? rand(['EUR', 'USD', 'GBP']) : 'EUR', maturity_date: addDays(tradeDate, between(730, 10950, 0)) };
            }
            const [trade] = await db.query(`INSERT INTO trades (trade_ref, trade_type, status, direction, trade_date, value_date, maturity_date, notional, notional_currency, price, yield, currency_pair, exchange_rate, captured_amount, captured_currency, desk, counterparty_id, legal_entity_id, trader_id, bond_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
         RETURNING id`, [tradeRef, type, status, direction, tradeDate, extra.value_date || null, extra.maturity_date || null,
                extra.notional || null, extra.notional_currency || null, extra.price || null, extra.yield || null,
                extra.currency_pair || null, extra.exchange_rate || null, extra.captured_amount || null, extra.captured_currency || null,
                desk, cptyId, leId, traderId, extra.bond_id || null]);
            const tradeId = trade.id;
            const taskTypesForTrade = ['CONFIRMATION', 'SETTLEMENT', 'ACCOUNTING', 'REPORTING'];
            if (['CDS', 'IRS', 'CCS'].includes(type))
                taskTypesForTrade.push('VALUATION', 'MARGIN_CALL');
            else
                taskTypesForTrade.push('VALUATION');
            for (const taskType of taskTypesForTrade) {
                await db.query(`INSERT INTO trade_tasks (trade_id, task_type, status, priority, assigned_to)
           VALUES ($1,$2,$3,$4,$5)`, [tradeId, taskType,
                    weightedStatus(TASK_WEIGHTS, TASK_STATUSES),
                    rand(TASK_PRIORITIES),
                    rand(MIDDLE_OFFICE)]);
            }
            if (extra.notional && status !== 'CANCELLED') {
                const notional = extra.notional;
                const mtm = between(-notional * 0.05, notional * 0.05);
                const dayPnl = between(-notional * 0.005, notional * 0.005);
                await db.query(`INSERT INTO valuations (trade_id, valuation_date, mtm, day_pnl, total_pnl, dv01, accrued_interest, dirty_price, clean_price, currency)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
           ON CONFLICT (trade_id, valuation_date) DO NOTHING`, [tradeId, today, mtm, dayPnl, mtm,
                    between(-50000, 50000), between(0, notional * 0.02),
                    between(90, 115, 6), between(88, 112, 6),
                    extra.notional_currency || 'EUR']);
            }
        }
        console.log(`     ✓ ${count} trades ${type} générés`);
    }
    await AppDataSource.destroy();
    console.log('\n✅ Seed terminé — 2000 trades insérés avec tâches et valorisations !');
}
runSeed().catch((err) => {
    console.error('❌ Seed échoué :', err);
    process.exit(1);
});
//# sourceMappingURL=run-seed.js.map