-- ============================================================
-- FUSION SUMMIT CAPITAL MARKETS — Schéma PostgreSQL
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUM types ───────────────────────────────────────────────

CREATE TYPE counterparty_type    AS ENUM ('BANK', 'CORPORATE', 'HEDGE_FUND', 'PENSION_FUND');
CREATE TYPE trade_type_enum      AS ENUM ('FX_SPOT', 'FX_SWAP', 'BOND', 'REPO', 'CDS', 'IRS', 'CCS');
CREATE TYPE trade_status_enum    AS ENUM ('NEW', 'CONFIRMED', 'SETTLED', 'CANCELLED', 'AMENDED');
CREATE TYPE trade_direction_enum AS ENUM ('BUY', 'SELL');
CREATE TYPE task_type_enum       AS ENUM ('CONFIRMATION', 'SETTLEMENT', 'VALUATION', 'MARGIN_CALL', 'ACCOUNTING', 'REPORTING');
CREATE TYPE task_status_enum     AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'OVERDUE');
CREATE TYPE task_priority_enum   AS ENUM ('LOW', 'NORMAL', 'HIGH', 'CRITICAL');
CREATE TYPE coupon_freq_enum     AS ENUM ('ANNUAL', 'SEMI_ANNUAL', 'QUARTERLY');
CREATE TYPE bond_type_enum       AS ENUM ('FIXED', 'FLOATING', 'ZERO_COUPON');
CREATE TYPE instrument_type_enum AS ENUM ('FX', 'RATE', 'CREDIT_SPREAD', 'BOND_PRICE');

-- ── STATIC DATA ──────────────────────────────────────────────

CREATE TABLE counterparties (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference     VARCHAR(50)  NOT NULL UNIQUE,
  referential   VARCHAR(50)  NOT NULL DEFAULT 'BBG',
  name          VARCHAR(200) NOT NULL,
  country       CHAR(3)      NOT NULL,
  city          VARCHAR(100),
  type          counterparty_type NOT NULL,
  credit_rating VARCHAR(10),
  lei           VARCHAR(20),
  active        BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE legal_entities (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference   VARCHAR(50)  NOT NULL UNIQUE,
  referential VARCHAR(50)  NOT NULL DEFAULT 'BBG',
  name        VARCHAR(200) NOT NULL,
  country     CHAR(3)      NOT NULL,
  currency    CHAR(3)      NOT NULL DEFAULT 'EUR',
  lei         VARCHAR(20),
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE traders (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference   VARCHAR(50)  NOT NULL UNIQUE,
  referential VARCHAR(50)  DEFAULT '',
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100) NOT NULL,
  desk        VARCHAR(100) NOT NULL,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── INSTRUMENTS ──────────────────────────────────────────────

CREATE TABLE bonds (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  isin             VARCHAR(12)   NOT NULL UNIQUE,
  ticker           VARCHAR(30)   NOT NULL,
  issuer           VARCHAR(200)  NOT NULL,
  currency         CHAR(3)       NOT NULL,
  face_value       DECIMAL(20,4) NOT NULL DEFAULT 1000,
  coupon_rate      DECIMAL(8,6)  NOT NULL,
  coupon_frequency coupon_freq_enum NOT NULL,
  issue_date       DATE NOT NULL,
  maturity_date    DATE NOT NULL,
  rating           VARCHAR(10),
  country          CHAR(3) NOT NULL,
  sector           VARCHAR(100),
  type             bond_type_enum NOT NULL DEFAULT 'FIXED',
  active           BOOLEAN DEFAULT TRUE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── TRADES (table centrale) ──────────────────────────────────

CREATE TABLE trades (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_ref          VARCHAR(50) NOT NULL UNIQUE,
  trade_type         trade_type_enum NOT NULL,
  status             trade_status_enum NOT NULL DEFAULT 'NEW',
  direction          trade_direction_enum NOT NULL,
  trade_date         DATE NOT NULL,
  value_date         DATE,
  maturity_date      DATE,
  notional           DECIMAL(20,4),
  notional_currency  CHAR(3),
  price              DECIMAL(20,8),
  yield              DECIMAL(10,6),
  currency_pair      VARCHAR(7),
  exchange_rate      DECIMAL(15,8),
  captured_amount    DECIMAL(20,4),
  captured_currency  CHAR(3),
  desk               VARCHAR(100),
  comments           TEXT,
  counterparty_id    UUID REFERENCES counterparties(id),
  legal_entity_id    UUID REFERENCES legal_entities(id),
  trader_id          UUID REFERENCES traders(id),
  bond_id            UUID REFERENCES bonds(id),
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ── INSTRUMENT-SPECIFIC TABLES ───────────────────────────────

CREATE TABLE fx_spot_trades (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id          UUID NOT NULL REFERENCES trades(id) ON DELETE CASCADE,
  currency_pair     VARCHAR(7) NOT NULL,
  direction         VARCHAR(10) NOT NULL,
  captured_amount   DECIMAL(20,4) NOT NULL,
  captured_currency CHAR(3) NOT NULL,
  exchange_rate     DECIMAL(15,8) NOT NULL,
  settlement_date   DATE NOT NULL
);

CREATE TABLE fx_swap_trades (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id              UUID NOT NULL REFERENCES trades(id) ON DELETE CASCADE,
  currency_pair         VARCHAR(7) NOT NULL,
  direction             VARCHAR(10) NOT NULL,
  captured_near_amount  DECIMAL(20,4) NOT NULL,
  captured_currency     CHAR(3) NOT NULL,
  exchange_rate         DECIMAL(15,8) NOT NULL,
  spot_margin           DECIMAL(10,4),
  far_exchange_rate     DECIMAL(15,8) NOT NULL,
  far_margin            DECIMAL(10,4),
  near_settlement_date  DATE NOT NULL,
  far_settlement_date   DATE NOT NULL
);

CREATE TABLE repo_trades (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id         UUID NOT NULL REFERENCES trades(id) ON DELETE CASCADE,
  bond_id          UUID REFERENCES bonds(id),
  repo_type        VARCHAR(20) NOT NULL DEFAULT 'REPO',
  notional         DECIMAL(20,4) NOT NULL,
  currency         CHAR(3) NOT NULL,
  repo_rate        DECIMAL(10,6) NOT NULL,
  start_date       DATE NOT NULL,
  end_date         DATE NOT NULL,
  haircut          DECIMAL(8,4) DEFAULT 0,
  collateral_isin  VARCHAR(12)
);

CREATE TABLE cds_trades (
  id                         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id                   UUID NOT NULL REFERENCES trades(id) ON DELETE CASCADE,
  reference_entity           VARCHAR(200) NOT NULL,
  reference_obligation_isin  VARCHAR(12),
  notional                   DECIMAL(20,4) NOT NULL,
  currency                   CHAR(3) NOT NULL,
  spread_bps                 DECIMAL(10,4) NOT NULL,
  premium_leg                VARCHAR(10) NOT NULL,
  start_date                 DATE NOT NULL,
  maturity_date              DATE NOT NULL,
  restructuring_type         VARCHAR(20) DEFAULT 'CR',
  recovery_rate              DECIMAL(8,4) DEFAULT 0.40
);

CREATE TABLE derivative_trades (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id          UUID NOT NULL REFERENCES trades(id) ON DELETE CASCADE,
  derivative_type   VARCHAR(20) NOT NULL,
  notional          DECIMAL(20,4) NOT NULL,
  currency          CHAR(3) NOT NULL,
  pay_leg_type      VARCHAR(20) NOT NULL,
  pay_rate          DECIMAL(10,6),
  pay_frequency     VARCHAR(20),
  receive_leg_type  VARCHAR(20) NOT NULL,
  receive_rate      DECIMAL(10,6),
  receive_frequency VARCHAR(20),
  floating_index    VARCHAR(50),
  start_date        DATE NOT NULL,
  maturity_date     DATE NOT NULL,
  day_count         VARCHAR(20) DEFAULT 'ACT/360'
);

-- ── BACK/MIDDLE OFFICE ───────────────────────────────────────

CREATE TABLE trade_tasks (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id     UUID NOT NULL REFERENCES trades(id),
  task_type    task_type_enum NOT NULL,
  status       task_status_enum NOT NULL DEFAULT 'PENDING',
  priority     task_priority_enum NOT NULL DEFAULT 'NORMAL',
  assigned_to  VARCHAR(100),
  due_date     TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  notes        TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── VALUATIONS ───────────────────────────────────────────────

CREATE TABLE valuations (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id         UUID NOT NULL REFERENCES trades(id),
  valuation_date   DATE NOT NULL,
  mtm              DECIMAL(20,4),
  day_pnl          DECIMAL(20,4),
  total_pnl        DECIMAL(20,4),
  dv01             DECIMAL(20,6),
  accrued_interest DECIMAL(20,4),
  dirty_price      DECIMAL(15,8),
  clean_price      DECIMAL(15,8),
  currency         CHAR(3) NOT NULL DEFAULT 'EUR',
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trade_id, valuation_date)
);

-- ── MARKET DATA ──────────────────────────────────────────────

CREATE TABLE market_data (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instrument_type instrument_type_enum NOT NULL,
  ticker          VARCHAR(50) NOT NULL,
  value           DECIMAL(20,8) NOT NULL,
  currency        CHAR(3),
  tenor           VARCHAR(20),
  as_of_date      DATE NOT NULL,
  source          VARCHAR(50) DEFAULT 'BLOOMBERG',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ticker, as_of_date)
);

-- ── INDEX ────────────────────────────────────────────────────

CREATE INDEX idx_trades_type        ON trades(trade_type);
CREATE INDEX idx_trades_status      ON trades(status);
CREATE INDEX idx_trades_date        ON trades(trade_date);
CREATE INDEX idx_trades_counterparty ON trades(counterparty_id);
CREATE INDEX idx_trades_desk        ON trades(desk);
CREATE INDEX idx_tasks_status       ON trade_tasks(status);
CREATE INDEX idx_tasks_priority     ON trade_tasks(priority);
CREATE INDEX idx_tasks_type         ON trade_tasks(task_type);
CREATE INDEX idx_valuations_date    ON valuations(valuation_date);
CREATE INDEX idx_market_date        ON market_data(as_of_date);
CREATE INDEX idx_market_ticker      ON market_data(ticker);
