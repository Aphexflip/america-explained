# AMERICA // EXPLAINED

> **The cheat sheet nobody gave you.**

A public, data-driven product that translates American personal finance, cost-of-living, benefits, work, housing, credit, insurance, and government mechanics into three questions:

1. **What is happening?**
2. **Is that normal?**
3. **What should I do about it?**

The north star is not “more statistics.” It is **statistics → meaning → action**.

## Current MVP

- National financial baseline using authoritative Census and BLS data.
- Explicit statistic labels so median and mean are never silently mixed.
- “You earned $100” normalization built from BLS Consumer Expenditure data, with a deliberate caveat that the unassigned remainder is **not** taxes or savings.
- Primitive “Make this about me” flow with ZIP, age, W-2 wage income, household type, children, housing, housing cost, and car ownership.
- 2026 federal income-tax estimate using IRS standard deductions/brackets plus 2026 employee Social Security/Medicare assumptions from SSA/IRS.
- Renter housing-burden comparison against the 2024 Census national median.
- Found Money architecture that refuses to claim eligibility before sufficient data exists.
- Dark/light themes, responsive mobile-first UI, zero frontend framework dependency.
- Cloudflare Pages Functions endpoint ready for D1.
- D1 schema and initial authoritative seed migration.

## Why this architecture

The MVP intentionally uses a **zero-build static frontend + Pages Functions + D1**. This is the lowest-friction Cloudflare-native path and keeps the product easy to deploy, inspect, and evolve. A framework can be introduced later if product complexity actually earns it.

```text
Browser
  ├─ public/index.html + styles.css + app.js
  ├─ GET /api/baseline
  │    └─ Cloudflare Pages Function
  │         └─ D1 metrics + sources
  └─ public/data/baseline.json
       └─ authoritative fallback until D1 is bound
```

### Data path

The long-term hierarchy is:

```text
United States
  → State
    → Metro / County
      → ZIP / local area
        → Household type
          → Income band
            → Personal circumstances
              → YOU
```

All statistical records are designed around explicit provenance: metric, value, unit, statistic type, percentile, geography, household definition, effective date, source, retrieval date, methodology, and confidence.

## Source policy

Primary factual foundation should come from authoritative sources such as Census/ACS, BLS, IRS, CFPB, HUD, SSA, CMS, USDA, Department of Education, Treasury, Federal Register, and state/local governments.

Current seeded sources:

- U.S. Census Bureau — *Income in the United States: 2024*
- U.S. Census Bureau — *2024 ACS 1-Year Estimates / Housing Costs*
- U.S. Bureau of Labor Statistics — *Consumer Expenditures — 2024*
- Internal Revenue Service — *Tax year 2026 inflation adjustments*
- Social Security Administration — *2026 Contribution and Benefit Base*

## Statistical rules

- Use **median** when it better represents a typical person/household.
- Never call a mean an “average American” without making the mean explicit.
- Do not compare rent to mortgage principal/interest only; future ownership tools use total ownership cost.
- Keep actual user inputs, estimates, and statistical comparisons visually/semantically distinct.
- Do not infer eligibility or financial certainty from rough screening inputs.

## Local preview

No frontend install is required:

```bash
python3 -m http.server 4173 -d public
```

Then open `http://localhost:4173`.

The Pages Function will not run in that simple static preview, so the client intentionally falls back to `public/data/baseline.json`.

## Cloudflare deployment

Recommended project settings if connecting GitHub to Cloudflare Pages:

- Framework preset: **None**
- Build command: **leave blank**
- Build output directory: `public`

Then create and bind D1:

```bash
npx wrangler d1 create america-explained-db
npx wrangler d1 migrations apply america-explained-db --remote
```

Add the returned database ID to `wrangler.jsonc` with binding name `DB`, or add the D1 binding in the Cloudflare Pages dashboard and redeploy.

Cloudflare's Pages documentation currently supports `pages_build_output_dir` plus `d1_databases` in Wrangler configuration for Pages Functions.

## Project files

```text
AGENTS.md                 continuity rules for future agents
CURRENT_CHECKPOINT.md     current state + exact next action
README.md                 mission and architecture
migrations/               D1 schema + seeds
functions/api/            Cloudflare Pages Functions
public/                   production frontend assets
public/data/              authoritative static fallback data
docs/                     product/data architecture notes
wrangler.jsonc            Cloudflare Pages configuration scaffold
```

## Product roadmap

**MVP now:** national baseline → $100 view → primitive personalization → first action ranking shell.

**Next:** D1 deployment, ZIP → geography resolution, ACS local baseline ingestion, state/local tax layer, real Found Money program rules, household comparisons, life-event and “Oh Shit” flows.

The product should never become a giant financial encyclopedia. Each screen should make the user's next decision easier.
