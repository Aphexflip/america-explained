# Build Prompt — **AMERICA // EXPLAINED**

### *The cheat sheet nobody gave you.*

I want you to create a new GitHub repository and begin building a public website for this project.

## Project vision

Build an extremely polished, modern, data-driven website that helps an ordinary person understand **how life in America actually works financially and practically**.

The site should answer:

> **“I live in America. Where is my money going, how do I compare to people like me, what programs or opportunities am I missing, what should I understand about taxes/credit/housing/work/government, and what can I actually do to improve my situation?”**

This should feel like:

**Apple-level visual polish + a financial dashboard + a practical life cheat sheet + government data translated into normal human language.**

The site must be **useful before the user enters any personal information**, but become dramatically more valuable when personalized.

---

# Core principle

Do **not** build merely an “average American statistics” website.

The national average is only the starting point.

The architecture should eventually move through:

**United States → State → Metro/County → Local area → Household type → Income band → Personal circumstances → YOU**

The eventual product should be able to say things such as:

> “Your housing cost is lower than similar households in your area.”

> “Your transportation spending is unusually high.”

> “You may qualify for this tax credit or assistance program.”

> “You are potentially leaving $2,400/year of employer benefits unused.”

> “Here are the three highest-value things you can do next.”

The product is not about statistics for their own sake.

## Statistics → meaning → action.

---

# Working name

## **AMERICA // EXPLAINED**

### *The cheat sheet nobody gave you.*

Potential RSYMO subdomain:

**america.rsymo.com**

Do not make naming decisions hard-coded in a way that makes renaming painful.

---

# MVP — BUILD THIS FIRST

Do not try to build every future feature immediately.

Create an exceptional first version containing:

## 1. The American Financial Dashboard

A visually stunning homepage showing the current baseline for a typical U.S. household.

Major categories should include:

- Income
- Take-home pay
- Taxes
- Housing
- Transportation
- Food
- Healthcare
- Insurance
- Debt
- Utilities
- Childcare
- Savings
- Retirement
- Discretionary spending

Use **median where median better represents a typical person**.

When useful, display:

- Median
- Mean
- 25th percentile
- 75th percentile
- National baseline
- Source year

Never casually use “average” where the underlying statistic is actually median.

---

# 2. The "$100" visualization

Create a beautiful visualization answering:

# **YOU EARNED $100. WHERE DID IT GO?**

Example conceptual flow:

```
$100.00 Gross income

Federal income tax
Social Security
Medicare
State/local taxes

↓ TAKE-HOME PAY

Housing
Transportation
Food
Healthcare
Debt
Insurance
Utilities
Entertainment

↓ MONEY LEFT

```

The values should eventually change based on the user's situation.

Do not fabricate numbers.

Use real data or clearly labeled demo/placeholder data until integrations exist.

---

# 3. Personalization — “MAKE THIS ABOUT ME”

Prominent CTA:

## **MAKE THIS ABOUT ME →**

Initial personalization should ask only for the minimum useful information:

- ZIP code
- Age
- Income
- Single / married / household type
- Number of children
- Rent / own
- Possibly car ownership

Avoid making onboarding feel like a tax return.

After personalization show:

# YOU vs AMERICA

and eventually:

# YOU vs PEOPLE LIKE YOU

Example outputs:

- Your housing burden
- Your transportation burden
- Estimated tax burden
- Estimated disposable income
- Savings rate
- Debt burden
- How each compares locally/nationally

Use strong visual status indicators such as:

🟢 healthy / below typical cost
🟡 worth examining
🔴 unusually expensive / potential problem

Do not imply financial certainty from rough estimates.

Clearly distinguish:

**actual user inputs / estimates / statistical comparisons.**

---

# 4. “FOUND MONEY”

This will eventually be one of the site's most valuable features.

Create a section capable of identifying:

## Money or benefits the user may be missing.

Future categories:

- Tax credits
- Earned Income Tax Credit
- Child-related credits
- ACA subsidies
- Medicaid / CHIP
- SNAP
- WIC
- Utility assistance / LIHEAP
- Housing assistance
- Student aid
- Unemployment
- Veterans benefits
- State assistance
- Local assistance
- Energy incentives
- Homebuyer programs
- Employer benefits
- HSA / FSA opportunities
- 401(k) matching

Rank opportunities using roughly:

## **Potential value × eligibility confidence ÷ effort**

Do not overwhelm users with 100 programs.

Prioritize the **best few opportunities**.

---

# Major future sections

Architect navigation and data models so these can be added cleanly later.

## 💵 MONEY

- Income
- Taxes
- Paychecks
- Budgeting
- Cost of living
- Savings
- Emergency funds
- Retirement

## 🧾 BILLS

Typical and local costs for:

- Rent
- Mortgage
- Electricity
- Natural gas
- Water
- Internet
- Cell service
- Auto insurance
- Health insurance
- Food
- Childcare
- Streaming
- Student loans
- Credit cards

Every category should eventually answer:

> **What is normal?**
>
> **What is cheap?**
>
> **What is expensive?**
>
> **What can I actually do to lower it?**

---

# 🏠 HOUSING

Create future tools for:

- Rent affordability
- Rent vs buy
- Mortgage affordability
- Down payment
- Closing costs
- Property taxes
- Homeowners insurance
- PMI
- Maintenance
- True homeownership cost
- First-time buyer programs

Never make the common mistake of comparing:

**rent payment vs mortgage principal/interest only.**

Use real total ownership cost.

---

# 💳 CREDIT & DEBT

Explain credit like a normal person needs it explained.

Future tools:

- Credit score basics
- Credit utilization
- Payment history
- Credit report mistakes
- APR
- Interest
- Credit cards
- Loans
- Debt payoff
- Refinancing
- Balance transfers
- True borrowing cost

Show money instead of abstract percentages whenever possible.

Example:

> "$7,000 at 29.99% APR will cost approximately \_\_\_ if paid this way."

---

# 🚗 CARS

Show the true cost of vehicle ownership:

- Purchase price
- Financing
- Interest
- Insurance
- Fuel
- Maintenance
- Registration
- Depreciation

Do not let users mentally equate a car payment with the cost of owning a car.

---

# 🏥 INSURANCE

Translate insurance language into human language:

- Deductible
- Premium
- Copay
- Coinsurance
- Out-of-pocket maximum
- HSA
- FSA
- Health insurance
- Auto insurance
- Homeowners
- Renters
- Life
- Disability

---

# 👷 WORK

Future section explaining:

- 401(k)
- Employer match
- Pension
- HSA
- FSA
- PTO
- Overtime
- Unemployment
- Workers' compensation
- Severance
- W-2
- 1099
- Withholding
- Benefits enrollment
- ESPP / equity compensation

Highlight unused compensation.

Example:

> **Your employer matches 4%, but you're contributing 1%.**

Then show estimated dollars left unused.

---

# 🆘 “OH SHIT” MODE

This should become one of the most practical parts of the site.

Create an emergency-help architecture around situations such as:

## I can't pay rent

## I lost my job

## I can't pay electricity

## I can't pay my credit cards

## I need healthcare

## I'm being evicted

## My car is being repossessed

## I need food

## I'm overwhelmed with debt

## I may become homeless

Responses should prioritize:

1. Immediate action
2. Deadlines that matter
3. Government/nonprofit help
4. Highest-value programs
5. Things NOT to do
6. Official application resources

Do not bury emergency answers under huge explanatory articles.

---

# 🗳️ GOVERNMENT / CIVICS

Eventually explain government without assuming political knowledge.

Future features:

- Who represents me?
- Federal vs state vs local powers
- What elected offices actually control
- Taxes
- Voting registration
- Upcoming election dates
- Polling location
- What's on my ballot
- Ballot initiatives
- Basic laws and rights
- Small claims
- Consumer rights
- Worker rights
- Public records
- Jury duty
- Passports
- Social Security
- Medicare

## Political neutrality is important here.

This section should provide **mechanics, facts, dates, evidence, and official sources**, not tell someone who to vote for.

---

# Major life-event cheat sheets

Eventually create concise guided flows for:

- I got my first job
- I lost my job
- I'm having a baby
- I'm getting married
- I'm getting divorced
- I'm buying a car
- I'm buying a house
- I'm moving
- Someone died
- I'm turning 18
- I'm turning 65
- I'm starting a business

Each should answer:

> **What should I do next that nobody teaches you?**

---

# Data philosophy

The site must have extremely strong sourcing.

Prefer authoritative U.S. sources such as:

- BLS
- Census / ACS
- IRS
- CFPB
- HUD
- SSA
- CMS
- USDA
- Department of Education
- Treasury
- Federal Register
- State governments
- County/local governments

Do not build the site's factual foundation from random blog articles.

Every statistic should eventually store:

```
metric
value
unit
median_or_mean
percentile
geography
household_definition
effective_date
source
source_url
retrieved_at
methodology
confidence

```

Data should be designed to refresh automatically later.

---

# Critical statistical rule

## “Average American” is often misleading.

Always think about whether **median** tells the story better.

For wealth, housing, rent, income, debt, and similar distributions, do not blindly use mathematical averages.

The UI should sometimes display:

```
25th percentile
Median
75th percentile
Average

```

so users understand the distribution rather than a misleading single number.

---

# Tax design principle

One of the site's first educational wins should be explaining:

## Marginal tax rate ≠ effective tax rate.

Users should eventually be able to see:

```
Gross income
Federal income tax
Social Security
Medicare
State income tax
Local tax
Credits
Effective tax rate
Marginal federal bracket
Actual take-home estimate

```

Keep the explanations simple.

---

# Desired user dashboard

The long-term personalized dashboard should look conceptually like:

```
────────────────────────────────────
          YOUR AMERICAN LIFE
────────────────────────────────────

INCOME                    $78,000
TAKE-HOME                 $59,420
SPENDING                  $52,910
LEFT                      $ 6,510

Financial breathing room      🟡
Housing burden                🟢
Transportation burden         🔴
Debt burden                   🟡
Retirement                    🔴
Emergency fund                🟡

────────────────────────────────────

FOUND MONEY

Potential tax savings
Employer benefit opportunity
Insurance opportunity
Bill savings
Government assistance

POTENTIAL IMPROVEMENT

             $4,780 / YEAR

────────────────────────────────────

        [ SHOW ME WHAT TO DO ]

```

Those values are illustrative placeholders only.

## **SHOW ME WHAT TO DO** is one of the most important interaction concepts.

Information should lead to action.

---

# Design direction

This needs to look exceptionally polished.

Not:

- government website
- generic finance blog
- spreadsheet
- Bootstrap admin dashboard
- cluttered fintech app

Think:

**Apple + Stripe + modern data visualization + calm financial command center.**

Visual principles:

- Large typography
- Beautiful whitespace
- Dark and light themes eventually
- Mobile-first
- Extremely clean hierarchy
- Interactive charts
- Cards used intentionally
- Minimal visual noise
- Smooth transitions
- Excellent responsive behavior
- Important values visible instantly

Homepage must create a **“BAM, I immediately understand my situation”** feeling.

Do not overdecorate.

---

# UX principle

The website should always answer these three questions in order:

## 1. What is happening?

## 2. Is that normal?

## 3. What should I do about it?

If a statistic does not help answer one of those questions, question whether it belongs.

---

# Architecture

I prefer a simple, scalable architecture compatible with the rest of the RSYMO ecosystem.

Strong default:

- GitHub repository
- Cloudflare Pages / Workers
- Cloudflare D1
- R2 if needed later
- scheduled ingestion jobs later
- API-first data layer
- modern responsive frontend

Do not introduce infrastructure complexity before we need it.

Build for future personalization and user accounts, but do not build full SaaS/account complexity into the first MVP unless necessary.

Never hardcode data that should eventually live in the database/API layer.

---

# What I want you to do now

## Phase 1

1. Create a new GitHub repo with a sensible name.
2. Establish the project structure.
3. Add a strong README explaining the mission and architecture.
4. Add an `AGENTS.md` or equivalent continuity file so future ChatGPT sessions know how to resume correctly.
5. Add a `CURRENT_CHECKPOINT.md` that future sessions update as work progresses.
6. Create the initial database/schema design.
7. Build the first beautiful homepage.
8. Seed a small amount of legitimate U.S. baseline data from authoritative sources.
9. Clearly mark any remaining demo data.
10. Implement the first primitive **MAKE THIS ABOUT ME** flow.
11. Make it excellent on desktop and mobile.
12. Prepare it for deployment to Cloudflare.
13. Give me the exact easiest next action whenever something requires me to click, authorize, create, or configure something.

## Do not stop at planning.

Actually begin building the repository and MVP.

Use your best judgment on normal technical decisions instead of asking me about every minor choice.

If something genuinely blocks progress, explain the shortest path through it.

---

# Product north star

The site succeeds when somebody can open it knowing almost nothing about personal finance, taxes, credit, housing, government benefits, or basic American bureaucracy and quickly understand:

> **Where they stand.**
>
> **How they compare.**
>
> **What they're missing.**
>
> **What matters most.**
>
> **And exactly what to do next.**

## The fundamental insight

**Google can tell someone a statistic.**

This product should tell them:

# **“Here is what that statistic means for YOU — and here is the highest-value thing you can do about it.”**
