# Database Standards — Always Apply

## Schema design
- Every table has a surrogate primary key — use `uuid` or `bigserial`, not business identifiers
- Timestamps on every table: `created_at` and `updated_at` — both `NOT NULL DEFAULT NOW()`
- Soft deletes with `deleted_at TIMESTAMP` — never hard delete user-facing records
- Foreign keys must be indexed — an unindexed FK is a query performance trap
- Column names: `snake_case`. Table names: `snake_case`, plural (`users`, `orders`, `line_items`)

## Naming conventions
- Boolean columns: `is_` prefix (`is_active`, `is_verified`, `is_deleted`)
- Timestamp columns: `_at` suffix (`created_at`, `published_at`, `expires_at`)
- Foreign keys: `[referenced_table_singular]_id` (`user_id`, `order_id`)
- Index names: `idx_[table]_[columns]` (`idx_users_email`, `idx_orders_user_id_created_at`)

## Query rules
- Never `SELECT *` in application code — always name the columns you need
- Pagination must use keyset/cursor pagination for large tables — never `OFFSET` beyond page 10
- Transactions for any operation that writes to more than one table
- Never run raw SQL in a loop — batch operations with `INSERT ... VALUES (...)` multi-row or bulk update

## Migrations
- Migrations are append-only — never edit a migration that has been run in production
- Each migration does one thing — split multi-step changes into multiple migration files
- Every migration that adds a column must be backward-compatible — old code must still work
- Test migrations by running them against a copy of production data before deploying

## Connection and performance
- Always use a connection pool — never create a new connection per request
- Set query timeouts — long-running queries must not block the pool
- Use `EXPLAIN ANALYZE` before deploying any new query that touches a large table
- Read replicas for reporting queries — never run heavy analytics on the primary
