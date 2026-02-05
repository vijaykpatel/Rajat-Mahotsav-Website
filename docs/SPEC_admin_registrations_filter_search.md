# Spec: Admin Registrations Table – Filter & Search

**Status**: Draft  
**Created**: 2025-02-04  
**Scope**: Add column filters and text search to the admin registrations table with optimized performance.

---

## 1. Overview

### 1.1 Goals

- **Column filters**: Filter by any column (exact match or range where applicable)
- **Text search**: Type words that match across text fields (name, email, etc.)
- **Performance**: Use indexes; avoid full table scans; maintain keyset pagination
- **Graceful UX**: Debounced search, clear filters, loading states, empty states

### 1.2 Non-Goals

- Inline editing of rows
- Bulk actions (delete, export filtered subset)
- Saved filter presets

---

## 2. Data Model Reference

**Table**: `public.registrations`

| Column | Type | Filter Type | Searchable |
|--------|------|-------------|------------|
| `id` | bigint | — | No |
| `first_name` | text | Exact | Yes |
| `middle_name` | text | Exact | Yes |
| `last_name` | text | Exact | Yes |
| `email` | text | Exact | Yes |
| `mobile_number` | text | Exact | Yes |
| `phone_country_code` | text | Exact | Yes |
| `country` | text | Exact | Yes |
| `ghaam` | text | Exact | Yes |
| `mandal` | text | Exact | Yes |
| `arrival_date` | date | Range | No |
| `departure_date` | date | Range | No |
| `age` | smallint | Exact / Range | No |

**Existing indexes** (from Task 9): `arrival_date`, `departure_date`, `ghaam`, `mandal`, `age`, `email`, `mobile_number`, composite `(arrival_date, departure_date)`.

---

## 3. API Specification

### 3.1 Endpoint

`GET /api/admin/registrations`

**Auth**: Same as current (session + `@nj.sgadi.us` domain).

### 3.2 Query Parameters

| Param | Type | Default | Description |
|-------|------|---------|--------------|
| `page_size` | 25 \| 50 \| 100 | 25 | Rows per page |
| `cursor` | number | — | Last seen `id` for keyset pagination |
| `direction` | `next` \| `prev` | `next` | Pagination direction |
| `ghaam` | string | — | Exact match on `ghaam` |
| `mandal` | string | — | Exact match on `mandal` (stored format, e.g. `new-jersey`) |
| `country` | string | — | Exact match on `country` |
| `age` | number | — | Exact match on `age` |
| `age_min` | number | — | `age >= age_min` |
| `age_max` | number | — | `age <= age_max` |
| `arrival_from` | ISO date | — | `arrival_date >= arrival_from` |
| `arrival_to` | ISO date | — | `arrival_date <= arrival_to` |
| `departure_from` | ISO date | — | `departure_date >= departure_from` |
| `departure_to` | ISO date | — | `departure_date <= departure_to` |
| `search` | string | — | Text search across name, email, mobile (see §4) |

### 3.3 Response

Unchanged from current:

```json
{
  "success": true,
  "rows": [...],
  "pageSize": 25,
  "nextCursor": 98,
  "prevCursor": 102,
  "hasMore": true,
  "hasPrev": true
}
```

### 3.4 Filter Application Order

1. Apply all filters (exact + range + search) to build `WHERE` clause
2. Order by `id DESC`
3. Apply keyset: `id < cursor` (next) or `id > cursor` (prev)
4. Limit `page_size`

**Important**: Cursor is always `id`. Filters are applied before keyset so pagination remains consistent within a filtered result set.

---

## 4. Text Search Specification

### 4.1 Behavior

- **Input**: User types one or more space-separated words (e.g. `"john doe"`, `"raval gmail"`)
- **Matching**: A row matches if **every** word matches **at least one** of the searchable columns
- **Columns searched**: `first_name`, `middle_name`, `last_name`, `email`, `mobile_number`
- **Matching rule**: Case-insensitive substring (`ilike '%word%'`)
- **Null handling**: Null columns are treated as empty string for matching

### 4.2 Example

Search: `"john gmail"`

- Row matches if: (`first_name` ilike '%john%' OR `middle_name` ilike '%john%' OR …) **AND** (`first_name` ilike '%gmail%' OR … OR `email` ilike '%gmail%' OR …)
- i.e. each word must appear somewhere across the searchable columns

### 4.3 Performance Strategy

**Option A – `ilike` (simpler, good for &lt; ~10k rows)**

- Use `OR` across columns per word, `AND` across words
- No schema change
- `ilike` cannot use standard B-tree indexes; may cause seq scan on large tables

**Option B – `pg_trgm` trigram index (recommended for substring search)**

- Enable `pg_trgm` extension
- Create GIN index: `CREATE INDEX idx_registrations_search_trgm ON registrations USING gin ((first_name || ' ' || coalesce(last_name,'') || ' ' || coalesce(email,'') || ' ' || coalesce(mobile_number,'')) gin_trgm_ops);`
- Or separate trigram indexes per column if single-column search is common
- Enables index usage for `ilike '%term%'` patterns

**Option C – Full-text search (`tsvector`)**

- Add generated column: `search_vector tsvector` over concatenated text columns
- GIN index on `search_vector`
- Use `to_tsquery` for word matching; supports ranking
- Better for “search as you type” with many rows; requires different query construction (no leading wildcard in tsquery)

**Recommendation**: Start with Option A for simplicity. If performance degrades (e.g. &gt; 5k rows, slow queries), migrate to Option B (trigram) or Option C (tsvector).

---

## 5. Index Strategy

### 5.1 Existing Indexes (Already Present)

- `idx_registrations_ghaam`, `idx_registrations_mandal`, `idx_registrations_age`
- `idx_registrations_arrival_date`, `idx_registrations_departure_date`
- `idx_registrations_email`, `idx_registrations_mobile_number`

### 5.2 Composite Indexes for Common Filter Combinations

Per `query-composite-indexes`: when multiple filters are used, composite indexes can help.

**Suggested composites** (add only if query plans show benefit):

| Index | Columns | Use Case |
|-------|---------|----------|
| `idx_registrations_ghaam_id` | `(ghaam, id)` | Filter by ghaam + keyset pagination |
| `idx_registrations_mandal_id` | `(mandal, id)` | Filter by mandal + keyset pagination |
| `idx_registrations_arrival_id` | `(arrival_date, id)` | Filter by arrival range + keyset |

**Note**: Postgres can use `(ghaam, id)` for `WHERE ghaam = 'X' ORDER BY id DESC`; the `id` in the index supports the keyset condition.

### 5.3 Text Search Index (If Using Trigram)

- Enable: `CREATE EXTENSION IF NOT EXISTS pg_trgm;`
- Index: GIN trigram on concatenated search columns or per-column trigram indexes

---

## 6. UI Specification

### 6.1 Filter Bar Layout

A collapsible/expandable filter bar above the table, consistent with site theme (`preset-deep-navy`, `preset-pale-gray`, `preset-charcoal`).

**Components**:

1. **Search input** (primary)
   - Placeholder: `"Search name, email, phone…"`
   - Debounce: 300–400 ms before firing API request
   - Clear button (X) when non-empty
   - Min length: 2 characters before search

2. **Column filters** (secondary, optional expand)
   - **Ghaam**: Dropdown or combobox. Options: fetch distinct values from new API endpoint + "All"
   - **Mandal**: Dropdown. Options: from `lib/mandal-options` (all mandals) + "All"
   - **Country**: Dropdown. Options: fetch distinct values from new API endpoint + "All"
   - **Age**: Optional. Either exact (number input) or range (min/max inputs)
   - **Arrival date**: Optional. From/to date pickers
   - **Departure date**: Optional. From/to date pickers

3. **Actions**
   - "Apply filters" or auto-apply on change (with debounce for search)
   - "Clear all" – resets all filters and search, reloads first page

### 6.2 Filter State & URL (Optional)

- Consider persisting filters in URL query params for shareable/bookmarkable filtered views
- Not required for initial implementation

### 6.3 Loading & Empty States

- **Loading**: Show spinner/skeleton when filters change and data is refetching
- **Empty**: "No registrations match your filters" with "Clear filters" button
- **Error**: Display API error message with retry option

### 6.4 Pagination with Filters

- When filters/search change: reset to first page (cursor = null)
- Prev/Next use cursor as today; filters remain applied
- "Load registrations" still required before first fetch; after load, filter bar is visible

---

## 7. Implementation Order

1. **API**: Add filter and search query params to `GET /api/admin/registrations`; implement `WHERE` clauses; keep keyset pagination
2. **UI**: Add search input with debounce
3. **UI**: Add ghaam, mandal dropdowns (use distinct values or existing option lists)
4. **UI**: Add remaining filters (country, age, dates) if needed
5. **Performance**: Run `EXPLAIN ANALYZE` on representative queries; add composite indexes if needed
6. **Performance**: If search is slow, add trigram or tsvector indexes per §4.3

---

## 8. Validation & Edge Cases

| Case | Behavior |
|------|----------|
| Empty search string | Ignore search filter |
| Search &lt; 2 chars | Ignore search filter |
| Invalid date in range | Return 400 or ignore invalid param |
| `age_min` &gt; `age_max` | Return 400 or treat as no match |
| Special chars in search | Escape for `ilike`; avoid SQL injection (use parameterized queries) |
| Null in filtered column | Row excluded for exact match; for `ilike` treat null as `''` |

---

## 9. Security

- All filtering happens server-side; no client-side filter bypass
- Reuse existing auth: session + `@nj.sgadi.us` domain check
- Parameterized queries only; no string concatenation for SQL
- `Cache-Control: no-store` already set for admin routes

---

## 10. References

- `supabase-postgres-best-practices`: `query-missing-indexes`, `query-composite-indexes`, `data-pagination`, `advanced-full-text-search`
- Current API: `app/api/admin/registrations/route.ts`
- Current UI: `app/admin/registrations/AdminRegistrationsTable.tsx`
- Mandal options: `lib/mandal-options.ts`
