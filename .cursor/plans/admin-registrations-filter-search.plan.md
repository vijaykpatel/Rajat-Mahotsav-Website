---
name: admin-registrations-filter-search
overview: Add column filters and text search to the admin registrations table with optimized performance, enabling admins to filter by ghaam, mandal, country, age, dates, and search across name, email, and phone.
todos:
  - id: api-filters
    content: Add filter and search query params to GET /api/admin/registrations
    status: pending
  - id: api-distinct
    content: Add API endpoint for distinct ghaam and country values (filter dropdowns)
    status: pending
  - id: ui-search
    content: Add search input with debounce to AdminRegistrationsTable
    status: pending
  - id: ui-dropdowns
    content: Add ghaam, mandal, country filter dropdowns
    status: pending
  - id: ui-remaining
    content: Add age and date range filters (optional)
    status: pending
  - id: perf-indexes
    content: Add composite indexes if EXPLAIN shows benefit; trigram/tsvector if search slow
    status: pending
isProject: false
---

# Admin Registrations Filter & Search Plan

## Context Summary

- The admin registrations table at `/admin/registrations` currently supports pagination (keyset, 25/50/100 per page) and CSV export.
- **No filtering or search** exists today; admins cannot narrow results by ghaam, mandal, or search by name/email.
- Task 9 added indexes on `ghaam`, `mandal`, `age`, `arrival_date`, `departure_date`, `email`, `mobile_number` – these support filtered queries.
- Source spec: `docs/SPEC_admin_registrations_filter_search.md`

## Feature Overview

- **Column filters**: Filter by ghaam, mandal, country (exact); age (exact or range); arrival/departure dates (range).
- **Text search**: Type words that match across `first_name`, `middle_name`, `last_name`, `email`, `mobile_number` (case-insensitive, all words must match).
- **Performance**: Use existing indexes; add composite indexes for filtered keyset pagination; optional trigram/tsvector for search at scale.
- **UX**: Debounced search, clear-all, loading/empty states, theme-consistent filter bar.

## Plan

### 1. API – Filter & Search Params

**Endpoint**: `GET /api/admin/registrations`

**New query params**:


| Param            | Type     | Description                                                |
| ---------------- | -------- | ---------------------------------------------------------- |
| `ghaam`          | string   | Exact match on `ghaam`                                     |
| `mandal`         | string   | Exact match on `mandal` (stored format, e.g. `new-jersey`) |
| `country`        | string   | Exact match on `country`                                   |
| `age`            | number   | Exact match on `age`                                       |
| `age_min`        | number   | `age >= age_min`                                           |
| `age_max`        | number   | `age <= age_max`                                           |
| `arrival_from`   | ISO date | `arrival_date >= arrival_from`                             |
| `arrival_to`     | ISO date | `arrival_date <= arrival_to`                               |
| `departure_from` | ISO date | `departure_date >= departure_from`                         |
| `departure_to`   | ISO date | `departure_date <= departure_to`                           |
| `search`         | string   | Text search across name, email, mobile (see §2)            |


**Filter application order**:

1. Build `WHERE` from all filters (exact + range + search)
2. Order by `id DESC`
3. Apply keyset: `id < cursor` (next) or `id > cursor` (prev)
4. Limit `page_size`

**Response**: Unchanged (rows, pageSize, nextCursor, prevCursor, hasMore, hasPrev).

### 2. Text Search Behavior

- **Input**: Space-separated words (e.g. `"john doe"`, `"raval gmail"`).
- **Matching**: Row matches if **every** word matches **at least one** of: `first_name`, `middle_name`, `last_name`, `email`, `mobile_number`.
- **Rule**: Case-insensitive substring (`ilike '%word%'`).
- **Nulls**: Treat as empty string for matching.

**Example**: Search `"john gmail"` → each word must appear somewhere across those columns.

**Performance**: Start with `ilike` (Option A). If slow at scale, add `pg_trgm` trigram index (Option B) or `tsvector` full-text search (Option C).

### 3. Index Strategy

**Existing** (Task 9): `idx_registrations_ghaam`, `idx_registrations_mandal`, `idx_registrations_age`, `idx_registrations_arrival_date`, `idx_registrations_departure_date`, `idx_registrations_email`, `idx_registrations_mobile_number`.

**Composite indexes** (add if `EXPLAIN ANALYZE` shows benefit):


| Index                          | Columns              | Use Case                         |
| ------------------------------ | -------------------- | -------------------------------- |
| `idx_registrations_ghaam_id`   | `(ghaam, id)`        | Filter by ghaam + keyset         |
| `idx_registrations_mandal_id`  | `(mandal, id)`       | Filter by mandal + keyset        |
| `idx_registrations_arrival_id` | `(arrival_date, id)` | Filter by arrival range + keyset |


**Search index** (if needed): Enable `pg_trgm`, add GIN trigram index on concatenated search columns.

### 4. UI – Filter Bar

**Layout**: Filter bar above table, theme: `preset-deep-navy`, `preset-pale-gray`, `preset-charcoal`.

**Components**:

1. **Search input** (primary)
  - Placeholder: `"Search name, email, phone…"`
  - Debounce: 300–400 ms
  - Clear button when non-empty
  - Min length: 2 chars before search
2. **Column filters** (secondary, expandable)
  - **Ghaam**: Dropdown – distinct values from new API endpoint + "All"
  - **Mandal**: Dropdown – from `lib/mandal-options` + "All"
  - **Country**: Dropdown – distinct values from new API endpoint + "All"
  - **Age**: Exact or min/max range (optional)
  - **Arrival / Departure**: From/to date pickers (optional)
3. **Actions**
  - Auto-apply on change (debounced for search)
  - "Clear all" – reset filters, reload first page

### 5. UX – Loading & Empty States

- **Loading**: Spinner/skeleton when filters change and data refetches
- **Empty**: "No registrations match your filters" + "Clear filters" button
- **Error**: Show API error with retry

### 6. Pagination with Filters

- Filters/search change → reset to first page (cursor = null)
- Prev/Next keep filters applied
- "Load registrations" still required before first fetch; filter bar visible after load

### 7. Validation & Edge Cases


| Case                     | Behavior                                     |
| ------------------------ | -------------------------------------------- |
| Empty search             | Ignore search filter                         |
| Search &lt; 2 chars      | Ignore search filter                         |
| Invalid date             | 400 or ignore param                          |
| `age_min` &gt; `age_max` | 400 or no match                              |
| Special chars in search  | Parameterized queries only; no SQL injection |


### 8. Security

- All filtering server-side
- Reuse session + `@nj.sgadi.us` auth
- Parameterized queries only
- `Cache-Control: no-store` already set

## Key Files / Areas

- API: `app/api/admin/registrations/route.ts`
- API (new): Endpoint for distinct ghaam/country values (for filter dropdowns)
- UI: `app/admin/registrations/AdminRegistrationsTable.tsx`
- Mandal options: `lib/mandal-options.ts`
- Stats (for ghaam/mandal options): `get_registrations_stats` RPC returns `counts_by_ghaam`, `counts_by_mandal`
- Spec: `docs/SPEC_admin_registrations_filter_search.md`

## Implementation Order

1. **API**: Add filter and search params; implement `WHERE` clauses; keep keyset pagination
2. **UI**: Search input with debounce
3. **UI**: Ghaam, mandal dropdowns
4. **UI**: Country, age, date filters (if needed)
5. **Performance**: `EXPLAIN ANALYZE`; add composite indexes if needed
6. **Performance**: Trigram/tsvector for search if slow

## Decisions / Assumptions

- Start with `ilike` for search; add trigram/tsvector only if performance requires it
- Mandal options from `lib/mandal-options`; ghaam and country from new API endpoint (distinct values)
- Min search length: 2 characters before firing search
- No URL persistence of filters in v1
- No bulk actions or export of filtered subset in v1

## Open Questions

- None. Resolved: min search length = 2 chars; fetch distinct ghaam/country from new API endpoint.

