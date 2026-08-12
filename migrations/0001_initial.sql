PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  agency TEXT NOT NULL,
  title TEXT NOT NULL,
  source_url TEXT NOT NULL,
  retrieved_at TEXT NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  metric_key TEXT NOT NULL,
  label TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  statistic_type TEXT NOT NULL CHECK (statistic_type IN ('median','mean','percentile','rate','derived')),
  percentile REAL,
  geography_type TEXT NOT NULL DEFAULT 'country',
  geography_code TEXT NOT NULL DEFAULT 'US',
  geography_label TEXT NOT NULL DEFAULT 'United States',
  household_definition TEXT,
  effective_date TEXT NOT NULL,
  source_id INTEGER NOT NULL,
  methodology TEXT,
  confidence TEXT NOT NULL DEFAULT 'high',
  is_demo INTEGER NOT NULL DEFAULT 0 CHECK (is_demo IN (0,1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (source_id) REFERENCES sources(id),
  UNIQUE(metric_key, geography_type, geography_code, effective_date, statistic_type)
);

CREATE INDEX IF NOT EXISTS idx_metrics_lookup ON metrics(metric_key, geography_type, geography_code, effective_date DESC);

CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  agency TEXT,
  geography_type TEXT NOT NULL DEFAULT 'country',
  geography_code TEXT NOT NULL DEFAULT 'US',
  official_url TEXT NOT NULL,
  category TEXT NOT NULL,
  description_plain TEXT NOT NULL,
  eligibility_rules_json TEXT,
  value_model_json TEXT,
  effort_score REAL,
  effective_from TEXT,
  effective_to TEXT,
  source_id INTEGER,
  is_active INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (source_id) REFERENCES sources(id)
);

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  zip_code TEXT,
  age INTEGER,
  annual_income REAL,
  household_type TEXT,
  children INTEGER,
  housing_tenure TEXT,
  monthly_housing_cost REAL,
  car_ownership INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_refresh_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_slug TEXT NOT NULL,
  started_at TEXT NOT NULL,
  finished_at TEXT,
  status TEXT NOT NULL,
  records_written INTEGER NOT NULL DEFAULT 0,
  error_message TEXT
);

INSERT OR IGNORE INTO sources (slug, agency, title, source_url, retrieved_at, notes) VALUES
('census-income-2024', 'U.S. Census Bureau', 'Income in the United States: 2024', 'https://www.census.gov/library/publications/2025/demo/p60-286.html', '2026-08-12', 'CPS ASEC national income baseline.'),
('census-acs-housing-2024', 'U.S. Census Bureau', '2024 ACS 1-Year Housing Costs', 'https://www.census.gov/newsroom/press-releases/2025/acs-1-year-estimates.html', '2026-08-12', 'National renter housing baseline.'),
('bls-ce-2024', 'U.S. Bureau of Labor Statistics', 'Consumer Expenditures — 2024', 'https://www.bls.gov/news.release/cesan.htm', '2026-08-12', 'Mean consumer-unit expenditures; do not label as median.'),
('irs-2026-tax', 'Internal Revenue Service', 'Tax year 2026 inflation adjustments', 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill', '2026-08-12', 'Federal brackets and standard deductions.'),
('ssa-2026-payroll', 'Social Security Administration', '2026 Contribution and Benefit Base', 'https://www.ssa.gov/OACT/cola/cbb.html', '2026-08-12', 'Employee OASDI rate and 2026 taxable maximum.');

INSERT OR IGNORE INTO metrics (metric_key,label,value,unit,statistic_type,geography_type,geography_code,geography_label,household_definition,effective_date,source_id,methodology,confidence,is_demo)
SELECT 'median_household_income','Median household income',83730,'USD/year','median','country','US','United States','Households; CPS ASEC money income, pretax','2024-01-01',id,'CPS ASEC national median household money income.','high',0 FROM sources WHERE slug='census-income-2024';

INSERT OR IGNORE INTO metrics (metric_key,label,value,unit,statistic_type,geography_type,geography_code,geography_label,household_definition,effective_date,source_id,methodology,confidence,is_demo)
SELECT 'median_gross_rent','Median gross rent',1487,'USD/month','median','country','US','United States','Renter-occupied housing units paying cash rent','2024-01-01',id,'Gross rent includes rent plus renter-paid utilities.','high',0 FROM sources WHERE slug='census-acs-housing-2024';

INSERT OR IGNORE INTO metrics (metric_key,label,value,unit,statistic_type,geography_type,geography_code,geography_label,household_definition,effective_date,source_id,methodology,confidence,is_demo)
SELECT 'median_rent_income_share','Median renter income spent on gross rent',31,'percent','median','country','US','United States','Renters for whom gross rent as a percent of income is computed','2024-01-01',id,'Median gross rent as a percentage of household income.','high',0 FROM sources WHERE slug='census-acs-housing-2024';

INSERT OR IGNORE INTO metrics (metric_key,label,value,unit,statistic_type,geography_type,geography_code,geography_label,household_definition,effective_date,source_id,methodology,confidence,is_demo)
SELECT 'mean_annual_expenditures','Average annual consumer expenditures',78535,'USD/year','mean','country','US','United States','BLS consumer units','2024-01-01',id,'Mean annual expenditures for all consumer units.','high',0 FROM sources WHERE slug='bls-ce-2024';
