CREATE SCHEMA IF NOT EXISTS fake_bigquery__query_cache;

DROP TABLE IF EXISTS fake_bigquery__query_cache.catalog;
CREATE TABLE fake_bigquery__query_cache.catalog
(
    query_id   TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_query_id PRIMARY KEY (query_id)
);
