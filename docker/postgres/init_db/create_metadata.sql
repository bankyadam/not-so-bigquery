CREATE SCHEMA IF NOT EXISTS fake_bigquery__metadata;
CREATE TYPE entity_type AS ENUM ('project', 'dataset', 'table', 'column');

DROP TABLE IF EXISTS fake_bigquery__metadata.metadata;
CREATE TABLE fake_bigquery__metadata.metadata
(
    entity_id   TEXT,
    entity_parent_path TEXT,
    entity_type entity_type,
    value       TEXT,
    CONSTRAINT unique_entity_parent_path_id_type PRIMARY KEY (entity_parent_path, entity_id, entity_type)
);
