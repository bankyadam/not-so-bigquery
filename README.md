# Not-So-BigQuery

An emulator for the Google BigQuery, that can be run locally, backed by PostgreSQL.

## Compatibility

### API Endpoints

Currently implemented REST API endpoints:

#### Projects
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
|     | GET    | /bigquery/v2/projects/{projectId}/serviceAccount |         |
|     | GET    | /bigquery/v2/projects |         |
 

#### Datasets
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
| ✅ | DELETE | /bigquery/v2/projects/{projectId}/datasets/{datasetId} |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets/{datasetId} |         |
| ✅ | POST   | /bigquery/v2/projects/{projectId}/datasets |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets |         |
|     | PATCH  | /bigquery/v2/projects/{projectId}/datasets/{datasetId} |         |
|     | PUT    | /bigquery/v2/projects/{projectId}/datasets/{datasetId} |         |
 

#### Tables
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
| ✅ | DELETE | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId} |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId} |         |
|     | POST   | /bigquery/v2/{resource=projects/*/datasets/*/tables/*}:getIamPolicy |         |
| ✅ | POST   | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables |         |
|     | PATCH  | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId} |         |
|     | POST   | /bigquery/v2/{resource=projects/*/datasets/*/tables/*}:setIamPolicy |         |
|     | POST   | /bigquery/v2/{resource=projects/*/datasets/*/tables/*}:testIamPermissions |         |
|     | PUT    | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId} |         |
 

#### Jobs
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
|     | POST   | /bigquery/v2/projects/{projectId}/jobs/{jobId}/cancel |         |
|     | GET    | /bigquery/v2/projects/{projectId}/jobs/{jobId} |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/queries/{jobId} |         |
| ✅ | POST   | /bigquery/v2/projects/{projectId}/jobs |         |
|     | GET    | /bigquery/v2/projects/{projectId}/jobs |         |
|     | POST   | /bigquery/v2/projects/{projectId}/queries |         |
 

#### Tabledata
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
| ✅ | POST   | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId}/insertAll | Unsupported feature are listed in the [source](src/api/tables/insertAll/index.js) |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId}/data | Unsupported feature are listed in the [source](src/api/tables/data/index.js) |
 
Models and Routines REST APIs to be implemented are not planned.

### SQL Compatibility

Since BigQuery uses its own SQL implementation, there can be and there are functionalities that will not work. To
achieve most of the features that BigQuery provides, Not-So-BigQuery uses its own query parser to translate to a
PostgreSQL-compatible query.

#### Supported BigQuery syntax

Link to the full query statement syntax: https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax

```
query_statement:
    query_expr

query_expr:
    [ WITH with_query_name AS ( query_expr ) [, ...] ]
    select | ( query_expr )
    [ ORDER BY expression [{ ASC | DESC }] [, ...] ]
    [ LIMIT count [ OFFSET skip_rows ] ]

select:
    SELECT [{ ALL | DISTINCT }]
        { [ expression. ]*
        | expression [ [ AS ] alias ] } [, ...]
    [ FROM from_item  [, ...] ]
    [ WHERE bool_expression ]
    [ GROUP BY expression [, ...] ]
    [ HAVING bool_expression ]

set_op:
    UNION { ALL | DISTINCT } | INTERSECT DISTINCT | EXCEPT DISTINCT

from_item: {
    table_name [ [ AS ] alias ] [ FOR SYSTEM_TIME AS OF timestamp_expression ]  |
    ( query_expr ) [ [ AS ] alias ] |
    with_query_name [ [ AS ] alias ]
}
``` 

## Installation

### From source

Download the source to your local computer and start with `docker-compose`:
```shell script
docker-compose up -d
```

This will start the Not-So-BigQuery in a container and will expose it's port to your `localhost:8080`.

After this, you can configure your library to use `localhost:8080` as the `apiEndpoint` to reach Google BigQuery API.

### NodeJS
```javascript
const bq = new BigQuery({ apiEndpoint: 'localhost:5550' });
```

## Contributions

Contributions greatly appreciated.

