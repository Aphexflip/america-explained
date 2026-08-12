# Data model direction

The metric model is deliberately geography- and provenance-first so personalization can become a narrowing query rather than a rewrite.

## Metric identity

A usable fact is not just `metric + value`. It is:

```text
metric_key
label
value
unit
statistic_type
percentile (optional)
geography_type
geography_code
geography_label
household_definition
effective_date
source_id
methodology
confidence
is_demo
```

## Personalization query ladder

A future comparison request should choose the most specific well-supported cohort available, falling back safely:

```text
ZIP/local cohort
→ county/metro
→ state
→ national
```

Then refine by dimensions such as household type, income band, renter/owner, number of children, age, and vehicle ownership only when the underlying dataset supports those dimensions with sufficient quality.

Do not create a false feeling of precision by combining incompatible surveys or thin samples.
