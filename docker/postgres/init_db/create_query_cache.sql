CREATE SCHEMA IF NOT EXISTS fake_bigquery__query_cache;

DROP TABLE IF EXISTS fake_bigquery__query_cache._catalog;
CREATE TABLE fake_bigquery__query_cache._catalog
(
    query_id   TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    expire_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_query_id PRIMARY KEY (query_id)
);
