# Not-So-BigQuery

An emulator for the Google BigQuery, that can be run locally, backed by PostgreSQL.

## Compatibility

### API Endpoints

More info [here](API_SUPPORT.md).

### Functions

More info [here](FUNCTION_SUPPORT.md).

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
    [ WHERE expression ]
    [ GROUP BY expression [, ...] ]
    [ HAVING expression ]

from_item: {
    table_name [ [ AS ] alias ]
    join |
    ( query_expr ) [ [ AS ] alias ] |
    with_query_name [ [ AS ] alias ]
}

join:
   from_item [ join_type ] JOIN from_item
   [ ON expression | USING ( join_column [, ...] ) ]

join_type:
   { INNER | CROSS | FULL [OUTER] | LEFT [OUTER] | RIGHT [OUTER] }
```

Where the `expression` is the following:

```
expression:
    literal_value |
    [ [ [ [ project_name . ] dataset_name . ] table_name . ] column_name ] |
    unary_operator expression |
    expression binary_operator expression |
    function_name ( [ expression [, ...] | * ] ) |
    ( expression [, ...] ) |
    CAST ( expression AS type_name ) |
    EXTRACT ( part FROM date_expression ) |
    expression IS [ NOT ] NULL | 
    expression IS [ NOT ] expression |
    expression [ NOT ] IN ( { expression | select } )

literal_value:
    numeric_literal |
    string_literal |
    NULL | TRUE | FALSE

unary_operator:
    NOT

binary_operator:
    AND | OR |
    < | <= | > | >= | = | <> | != 
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

