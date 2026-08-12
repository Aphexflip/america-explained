interface Env {
  DB?: D1Database;
}

type Context = EventContext<Env, string, Record<string, unknown>>;

export const onRequestGet = async ({ env }: Context): Promise<Response> => {
  if (!env.DB) {
    return Response.json(
      { ok: false, code: 'D1_NOT_CONFIGURED', message: 'Baseline API is waiting for the D1 binding. Client should use the authoritative static fallback.' },
      { status: 503, headers: { 'cache-control': 'no-store' } }
    );
  }

  const { results } = await env.DB.prepare(`
    SELECT
      m.metric_key AS key,
      m.label,
      m.value,
      m.unit,
      m.statistic_type AS statistic,
      m.geography_label AS geography,
      m.effective_date,
      m.methodology,
      m.confidence,
      m.is_demo,
      s.agency,
      s.title AS source_name,
      s.source_url,
      s.retrieved_at
    FROM metrics m
    JOIN sources s ON s.id = m.source_id
    WHERE m.geography_code = 'US'
    ORDER BY m.metric_key
  `).all();

  return Response.json(
    { ok: true, source: 'd1', metrics: results },
    { headers: { 'cache-control': 'public, max-age=300' } }
  );
};
