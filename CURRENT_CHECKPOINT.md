# CURRENT CHECKPOINT

**Project:** AMERICA // EXPLAINED  
**Date:** 2026-08-12  
**Target domain:** `america.rsymo.com`  
**Canonical repository:** `Aphexflip/america-explained`  
**Current main commit:** `ae5c3a7698ea8ca3f5b50ffcdc392ae540c8ac0b`

## Current state

The canonical GitHub repository is initialized and the v0.1 MVP has been seeded to `main`.

### Built and committed

- Zero-build, responsive static frontend in `public/`.
- Premium dark/light visual system.
- National dashboard with sourced Census/BLS baseline metrics.
- Explicit MEDIAN vs MEAN labeling.
- “You earned $100” visualization using derived BLS normalization and a strong non-fabrication caveat.
- “Make this about me” primitive flow with browser-local storage only.
- 2026 federal tax estimator using IRS bracket/standard-deduction data and SSA/IRS payroll-tax data.
- Renter housing burden comparison vs 2024 Census median.
- Found Money ranking concept/shell.
- D1 schema and authoritative seed migration.
- `/api/baseline` Pages Function that reads D1 when binding `DB` exists.
- Static authoritative JSON fallback while D1 is not configured.
- `README.md`, `AGENTS.md`, `PROJECT_SPEC.md`, data model docs, and this checkpoint.
- Cloudflare Pages config scaffold.

## Validation completed

- GitHub recursive tree verified after commit; all intended MVP files are present on `main`.
- Stale unused root React scaffold `index.html` was removed before import.
- `public/app.js` passes `node --check`.
- `public/data/baseline.json` parses successfully.
- `migrations/0001_initial.sql` executes successfully against SQLite in-memory validation.

## Authoritative seeded facts

- 2024 median U.S. household income: **$83,730** — Census CPS ASEC.
- 2024 median U.S. gross rent: **$1,487/month** — Census ACS 1-year.
- 2024 median renter gross-rent income share: **31%** — Census ACS.
- 2024 mean annual consumer expenditures: **$78,535** — BLS Consumer Expenditure Survey.
- 2024 BLS mean pre-tax income for consumer units: **$104,207**.
- 2026 federal standard deductions/brackets: IRS.
- 2026 employee Social Security rate **6.2%**, wage base **$184,500**; Medicare **1.45%** — SSA/IRS.

## Critical caveat preserved in product

BLS did not publish 2024 federal/state tax estimates or after-tax income in CE because its external tax model was not updated for tax year 2024. Therefore the national `$100` baseline does **not** label the unassigned remainder as taxes or savings.

## Current blocker

No code blocker. Cloudflare account configuration is the next external step.

## Exact next human action

Connect `Aphexflip/america-explained` to Cloudflare Pages:

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select `Aphexflip/america-explained`.
3. Framework preset: **None**.
4. Build command: **blank**.
5. Build output directory: `public`.
6. Deploy the first Pages build.

Then create D1 database `america-explained-db`, bind it as `DB`, apply `migrations/0001_initial.sql`, verify `/api/baseline`, and attach `america.rsymo.com`.

## Next product work after deployment

1. Add ZIP → Census geography resolution.
2. Add ACS local metrics for income, rent, housing burden, and household comparison.
3. Add state/local tax layer.
4. Build the first real Found Money program rules and ranking engine.
5. Expand YOU vs AMERICA into YOU vs PEOPLE LIKE YOU.

## Do not casually reverse

- Keep mean/median semantics explicit.
- Keep user inputs vs estimates vs population statistics separate.
- Do not fabricate tax/benefit values to make the UI look fuller.
- Keep onboarding short.
- Keep the first screen BAM-simple, not encyclopedic.
