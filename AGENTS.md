# AGENTS.md — Continuity contract

This repository is the source of truth for **AMERICA // EXPLAINED**.

## Before changing anything

1. Read `README.md`.
2. Read `CURRENT_CHECKPOINT.md`.
3. Inspect the latest git state and deployed Cloudflare state if available.
4. Inspect `migrations/` and `public/data/baseline.json` before changing factual numbers.
5. Never replace authoritative data with remembered/general-model numbers.

## Product north star

The site succeeds when a person can quickly understand:

- where they stand,
- how they compare,
- what they may be missing,
- what matters most,
- and exactly what to do next.

The core transformation is **statistics → meaning → action**.

## Non-negotiable data rules

- Median vs mean must be explicit.
- “Average” must never be used casually when the statistic is median.
- Store/attach source, source URL, year/effective date, geography, household definition, methodology, confidence, and retrieval date.
- Prefer primary government sources.
- Clearly mark demo/placeholder data. Prefer no number over a made-up number.
- Actual user inputs, estimates, heuristics, and population statistics must remain distinguishable.
- Tax and benefit outputs must include material assumptions and should not claim certainty without adequate inputs.

## Architecture rule

Keep the architecture simple until scale/product needs justify more:

- GitHub source of truth
- Cloudflare Pages + Pages Functions
- D1 for structured metrics/program rules/provenance
- R2 only if larger files/assets justify it
- scheduled ingestion later

Do not introduce full SaaS/auth complexity into the MVP merely because it may be useful someday.

## UX rule

Every feature should answer, in order:

1. What is happening?
2. Is that normal?
3. What should I do about it?

Homepage should feel immediate, calm, data-rich, and visually premium — not like a government portal, finance blog, spreadsheet, or generic admin dashboard.

## Before ending a substantial work session

Update `CURRENT_CHECKPOINT.md` with:

- what changed,
- what was validated,
- what is deployed,
- blockers,
- exact next action,
- key decisions that future sessions must not reverse casually.
