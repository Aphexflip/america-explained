# CURRENT CHECKPOINT

**Project:** AMERICA // EXPLAINED  
**Date:** 2026-08-12  
**Target domain:** `america.rsymo.com`  
**Canonical repository:** `Aphexflip/america-explained`

## Current state

The repository now exists and this MVP is being seeded as its initial project state.

### Built

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

No code blocker. The next human/configuration work is Cloudflare deployment and D1 binding.

## Exact next action

1. Connect `Aphexflip/america-explained` to Cloudflare Pages.
2. Framework preset: **None**.
3. Build command: **blank**.
4. Build output directory: `public`.
5. Create D1 database `america-explained-db`, bind it as `DB`, and apply `migrations/0001_initial.sql`.
6. Verify `/api/baseline` returns D1-backed records.
7. Point `america.rsymo.com` to the Pages project.

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
