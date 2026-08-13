# CURRENT CHECKPOINT

**Project:** AMERICA // EXPLAINED  
**Date:** 2026-08-12  
**Target domain:** `america.rsymo.com`  
**Canonical repository:** `Aphexflip/america-explained`

## Current state

The canonical GitHub repository is initialized and the v0.1 MVP is committed to `main`.

Cloudflare was connected using the newer Workers Builds flow rather than the classic Pages Git-build flow. The first Cloudflare build failed during **Cloning** with `Failed: error occurred while fetching repository`, before install/build/deploy began.

The repository has therefore been adapted to match the Worker Cloudflare actually created instead of forcing a restart.

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
- `/api/baseline` Worker route in `src/index.ts` that reads D1 when binding `DB` exists.
- Static authoritative JSON fallback while D1 is not configured.
- Worker static-assets binding via `assets.directory = ./public`.
- `README.md`, `AGENTS.md`, `PROJECT_SPEC.md`, data model docs, and this checkpoint.

## Cloudflare architecture now

```text
Cloudflare Worker: america-explained
  ├─ src/index.ts
  │   └─ /api/baseline → D1 when DB is bound
  └─ ASSETS binding
      └─ public/
          ├─ index.html
          ├─ app.js
          ├─ styles.css
          └─ data/baseline.json fallback
```

`wrangler.jsonc` now uses:

- `main: ./src/index.ts`
- `assets.directory: ./public`
- `assets.binding: ASSETS`

`package.json` now uses `wrangler dev` and `wrangler deploy`.

The obsolete Pages Function at `functions/api/baseline.ts` was removed.

## Validation completed

- GitHub recursive tree verified after MVP import.
- Stale unused root React scaffold `index.html` removed before import.
- `public/app.js` previously passed `node --check`.
- `public/data/baseline.json` parses successfully.
- `migrations/0001_initial.sql` executes successfully against SQLite in-memory validation.
- Cloudflare failure occurred before code execution; the current blocker is repository fetch access, not app code.

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

Cloudflare Workers Builds cannot currently fetch/clone `Aphexflip/america-explained`.

The build log shows initialization succeeded, then cloning ran for roughly two minutes and failed before install/deploy.

## Exact next human action

1. Cloudflare → **Workers & Pages → america-explained → Settings → Builds**.
2. Under **Git Repository**, choose **Manage**.
3. In GitHub, configure the **Cloudflare Workers & Pages** GitHub App.
4. If repository access is set to selected repositories, make sure **`Aphexflip/america-explained`** is selected, then save.
5. Return to Cloudflare and retry the build.
6. If the repository was already authorized, retry once because a fetch failure can be transient. Do not change app code for this clone-stage error.

After a successful Worker deploy: create D1 database `america-explained-db`, bind it as `DB`, apply `migrations/0001_initial.sql`, verify `/api/baseline`, and attach `america.rsymo.com`.

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
