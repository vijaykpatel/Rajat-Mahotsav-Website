-- Registration stats RPC: aggregated metrics for admin dashboard
-- Applied: via Supabase MCP apply_migration
-- Ref: supabase-postgres-best-practices (security-invoker, explicit schema)

CREATE OR REPLACE FUNCTION public.get_registrations_stats(
  p_start_date date DEFAULT '2026-07-29'::date,
  p_end_date date DEFAULT '2026-08-02'::date
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
  v_total bigint;
  v_unique_visitors bigint;
  v_counts_by_ghaam jsonb;
  v_counts_by_mandal jsonb;
  v_counts_by_arrival jsonb;
  v_counts_by_departure jsonb;
  v_daily_attendance jsonb;
BEGIN
  SELECT count(*)::bigint INTO v_total FROM public.registrations;

  SELECT count(DISTINCT (
    coalesce(trim(first_name), '') || '|' ||
    coalesce(trim(last_name), '') || '|' ||
    coalesce(trim(email), '') || '|' ||
    coalesce(trim(mobile_number), '') || '|' ||
    coalesce(age::text, '')
  ))::bigint
  INTO v_unique_visitors
  FROM public.registrations;

  SELECT jsonb_object_agg(coalesce(nullif(trim(ghaam), ''), 'Unknown'), cnt)
  INTO v_counts_by_ghaam
  FROM (
    SELECT coalesce(nullif(trim(ghaam), ''), 'Unknown') AS ghaam, count(*)::bigint AS cnt
    FROM public.registrations
    GROUP BY coalesce(nullif(trim(ghaam), ''), 'Unknown')
  ) t;

  SELECT jsonb_object_agg(coalesce(nullif(trim(mandal), ''), 'Unknown'), cnt)
  INTO v_counts_by_mandal
  FROM (
    SELECT coalesce(nullif(trim(mandal), ''), 'Unknown') AS mandal, count(*)::bigint AS cnt
    FROM public.registrations
    GROUP BY coalesce(nullif(trim(mandal), ''), 'Unknown')
  ) t;

  SELECT jsonb_object_agg(coalesce(arrival_date::text, 'Unknown'), cnt)
  INTO v_counts_by_arrival
  FROM (
    SELECT coalesce(arrival_date::text, 'Unknown') AS arrival_date, count(*)::bigint AS cnt
    FROM public.registrations
    GROUP BY coalesce(arrival_date::text, 'Unknown')
  ) t;

  SELECT jsonb_object_agg(coalesce(departure_date::text, 'Unknown'), cnt)
  INTO v_counts_by_departure
  FROM (
    SELECT coalesce(departure_date::text, 'Unknown') AS departure_date, count(*)::bigint AS cnt
    FROM public.registrations
    GROUP BY coalesce(departure_date::text, 'Unknown')
  ) t;

  SELECT jsonb_object_agg((d::date)::text, cnt)
  INTO v_daily_attendance
  FROM generate_series(
    greatest(p_start_date, '1970-01-01'::date),
    least(p_end_date, '2100-12-31'::date),
    '1 day'::interval
  ) AS g(d)
  CROSS JOIN LATERAL (
    SELECT count(*)::bigint AS cnt
    FROM public.registrations r
    WHERE r.arrival_date IS NOT NULL
      AND r.departure_date IS NOT NULL
      AND r.arrival_date <= (g.d)::date
      AND r.departure_date >= (g.d)::date
  ) c;

  v_result := jsonb_build_object(
    'total_registrations', coalesce(v_total, 0),
    'unique_visitors', coalesce(v_unique_visitors, 0),
    'counts_by_ghaam', coalesce(v_counts_by_ghaam, '{}'::jsonb),
    'counts_by_mandal', coalesce(v_counts_by_mandal, '{}'::jsonb),
    'counts_by_arrival_date', coalesce(v_counts_by_arrival, '{}'::jsonb),
    'counts_by_departure_date', coalesce(v_counts_by_departure, '{}'::jsonb),
    'daily_expected_attendance', coalesce(v_daily_attendance, '{}'::jsonb),
    'date_range', jsonb_build_object('start', p_start_date::text, 'end', p_end_date::text)
  );

  RETURN v_result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_registrations_stats(date, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_registrations_stats(date, date) TO service_role;
