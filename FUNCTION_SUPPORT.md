# Function support

## Aggregate functions
There is currently a limitation in the backing PostgreSQL (_DISTINCT is not implemented for window functions_),
so you can not write such query:
```SQL
SELECT COUNT(DISTINCT x) OVER (…)
```


|  | function |
|---|---|
| ❌ | ANY_VALUE |
| ❌ | ARRAY_AGG |
| ❌ | ARRAY_CONCAT_AGG |
| ✅ | AVG |
| ✅ | BIT_AND |
| ✅ | BIT_OR |
| ❌ | BIT_XOR |
| ✅ | COUNT |
| ✅ | COUNTIF|
| ❌ | LOGICAL_AND |
| ❌ | LOGICAL_OR |
| ❌ | MAX |
| ❌ | MIN |
| ❌ | STRING_AGG |
| ❌ | SUM |

## Statistical aggregate functions
|  | function |
|---|---|
| ❌ | CORR |
| ❌ | COVAR_POP |
| ❌ | COVAR_SAMP |
| ❌ | STDDEV_POP |
| ❌ | STDDEV_SAMP |
| ❌ | STDDEV |
| ❌ | VAR_POP |
| ❌ | VAR_SAMP |
| ❌ | VARIANCE |

## Approximate aggregate functions
|  | function |
|---|---|
| ❌ | APPROX_COUNT_DISTINCT |
| ❌ | APPROX_QUANTILES |
| ❌ | APPROX_TOP_COUNT |
| ❌ | APPROX_TOP_SUM |

## HyperLogLog
|  | function |
|---|---|
| ❌ | HLL_COUNT.INIT |
| ❌ | HLL_COUNT.MERGE |
| ❌ | HLL_COUNT.MERGE_PARTIAL |
| ❌ | HLL_COUNT.EXTRACT |

## Numbering functions
|  | function |
|---|---|
| ❌ | RANK |
| ❌ | DENSE_RANK |
| ❌ | PERCENT_RANK |
| ❌ | CUME_DIST |
| ❌ | NTILE |
| ❌ | ROW_NUMBER |

## Bit functions
|  | function |
|---|---|
| ❌ | BIT_COUNT |

## Conversion functions
|  | function |
|---|---|
| ❌ | CAST AS ARRAY |
| ❌ | CAST AS BIGNUMERIC |
| ❌ | CAST AS BOOL |
| ❌ | CAST AS BYTES |
| ❌ | CAST AS DATE |
| ❌ | CAST AS DATETIME |
| ❌ | CAST AS FLOAT64 |
| ✅ | CAST AS INT64 |
| ❌ | CAST AS NUMERIC |
| ❌ | CAST AS STRING |
| ❌ | CAST AS STRUCT |
| ❌ | CAST AS TIME |
| ❌ | CAST AS TIMESTAMP |
| ❌ | SAFE_CAST |

## Mathematical functions
|  | function |
|---|---|
| ❌ | ABS |
| ❌ | SIGN |
| ❌ | IS_INF |
| ❌ | IS_NAN |
| ❌ | IEEE_DIVIDE |
| ❌ | RAND |
| ❌ | SQRT |
| ❌ | POW |
| ❌ | POWER |
| ❌ | EXP |
| ❌ | LN |
| ❌ | LOG |
| ❌ | LOG10 |
| ❌ | GREATEST |
| ❌ | LEAST |
| ❌ | DIV |
| ❌ | SAFE_DIVIDE |
| ❌ | SAFE_MULTIPLY |
| ❌ | SAFE_NEGATE |
| ❌ | SAFE_ADD |
| ❌ | SAFE_SUBTRACT |
| ❌ | MOD |
| ❌ | ROUND |
| ❌ | TRUNC |
| ❌ | CEIL |
| ❌ | CEILING |
| ❌ | FLOOR |
| ❌ | COS |
| ❌ | COSH |
| ❌ | ACOS |
| ❌ | ACOSH |
| ❌ | SIN |
| ❌ | SINH |
| ❌ | ASIN |
| ❌ | ASINH |
| ❌ | TAN |
| ❌ | TANH |
| ❌ | ATAN |
| ❌ | ATANH |
| ❌ | ATAN2 |
| ❌ | RANGE_BUCKET |

## Navigation functions
|  | function |
|---|---|
| ❌ | FIRST_VALUE |
| ❌ | LAST_VALUE |
| ❌ | NTH_VALUE |
| ❌ | LEAD |
| ❌ | LAG |
| ❌ | PERCENTILE_CONT |
| ❌ | PERCENTILE_DISC |

## Aggregate analytic functions
|  | function |
|---|---|

## Hash functions
|  | function |
|---|---|
| ❌ | FARM_FINGERPRINT |
| ❌ | MD5 |
| ❌ | SHA1 |
| ❌ | SHA256 |
| ❌ | SHA512 |

## String functions
|  | function |
|---|---|
| ❌ | ASCII |
| ❌ | BYTE_LENGTH |
| ❌ | CHAR_LENGTH |
| ❌ | CHARACTER_LENGTH |
| ❌ | CHR |
| ❌ | CODE_POINTS_TO_BYTES |
| ❌ | CODE_POINTS_TO_STRING |
| ❌ | CONCAT |
| ❌ | ENDS_WITH |
| ❌ | FORMAT |
| ❌ | FROM_BASE32 |
| ❌ | FROM_BASE64 |
| ❌ | FROM_HEX |
| ❌ | INITCAP |
| ❌ | INSTR |
| ❌ | LEFT |
| ❌ | LENGTH |
| ❌ | LPAD |
| ❌ | LOWER |
| ❌ | LTRIM |
| ❌ | NORMALIZE |
| ❌ | NORMALIZE_AND_CASEFOLD |
| ❌ | OCTET_LENGTH |
| ❌ | REGEXP_CONTAINS |
| ❌ | REGEXP_EXTRACT |
| ❌ | REGEXP_EXTRACT_ALL |
| ❌ | REGEXP_INSTR |
| ❌ | REGEXP_REPLACE |
| ❌ | REGEXP_SUBSTR |
| ❌ | REPLACE |
| ❌ | REPEAT |
| ❌ | REVERSE |
| ❌ | RIGHT |
| ❌ | RPAD |
| ❌ | RTRIM |
| ❌ | SAFE_CONVERT_BYTES_TO_STRING |
| ❌ | SOUNDEX |
| ❌ | SPLIT |
| ❌ | STARTS_WITH |
| ❌ | STRPOS |
| ❌ | SUBSTR |
| ❌ | SUBSTRING |
| ❌ | TO_BASE32 |
| ❌ | TO_BASE64 |
| ❌ | TO_CODE_POINTS |
| ❌ | TO_HEX |
| ❌ | TRANSLATE |
| ❌ | TRIM |
| ❌ | UNICODE |
| ❌ | UPPER |

## JSON functions
|  | function |
|---|---|
| ❌ | Function overview |
| ❌ | JSON_EXTRACT |
| ❌ | JSON_QUERY |
| ❌ | JSON_EXTRACT_SCALAR |
| ❌ | JSON_VALUE |
| ❌ | JSON_EXTRACT_ARRAY |
| ❌ | JSON_QUERY_ARRAY |
| ❌ | JSON_EXTRACT_STRING_ARRAY |
| ❌ | JSON_VALUE_ARRAY |
| ❌ | TO_JSON_STRING |

## Array functions
|  | function |
|---|---|
| ❌ | ARRAY |
| ❌ | ARRAY_CONCAT |
| ❌ | ARRAY_LENGTH |
| ❌ | ARRAY_TO_STRING |
| ❌ | GENERATE_ARRAY |
| ❌ | GENERATE_DATE_ARRAY |
| ❌ | GENERATE_TIMESTAMP_ARRAY |
| ❌ | OFFSET and ORDINAL |
| ❌ | ARRAY_REVERSE |
| ❌ | SAFE_OFFSET and SAFE_ORDINAL |

## Date functions
|  | function |
|---|---|
| ⚠️ | CURRENT_DATE (no timezone support) |
| ✅ | EXTRACT |
| ✅ | DATE |
| ✅ | DATE_ADD |
| ✅ | DATE_SUB |
| ⚠️ | DATE_DIFF (ISOWEEK, QUARTER, ISOWEEK and WEEK(<WEEKDAY>) is not supported) |
| ⚠️ | DATE_TRUNC (WEEK(<WEEKDAY>) is not supported) |
| ❌ | DATE_FROM_UNIX_DATE |
| ⚠️ | FORMAT_DATE ("w": The weekday (Sunday as the first day of the week) as a decimal number (1-7) instead of (0-6)) |
| ❌ | LAST_DAY |
| ❌ | PARSE_DATE |
| ❌ | UNIX_DATE |

## Datetime functions
|  | function |
|---|---|
| ❌ | CURRENT_DATETIME |
| ❌ | DATETIME |
| ❌ | EXTRACT |
| ❌ | DATETIME_ADD |
| ❌ | DATETIME_SUB |
| ❌ | DATETIME_DIFF |
| ❌ | DATETIME_TRUNC |
| ❌ | FORMAT_DATETIME |
| ❌ | LAST_DAY |
| ❌ | PARSE_DATETIME |

## Time functions
|  | function |
|---|---|
| ⚠️ | CURRENT_TIME (no timezone support) |
| ✅ | TIME |
| ✅ | EXTRACT |
| ❌ | TIME_ADD |
| ❌ | TIME_SUB |
| ❌ | TIME_DIFF |
| ❌ | TIME_TRUNC |
| ❌ | FORMAT_TIME |
| ❌ | PARSE_TIME |

## Timestamp functions
|  | function |
|---|---|
| ❌ | CURRENT_TIMESTAMP |
| ❌ | EXTRACT |
| ❌ | STRING |
| ❌ | TIMESTAMP |
| ❌ | TIMESTAMP_ADD |
| ❌ | TIMESTAMP_SUB |
| ❌ | TIMESTAMP_DIFF |
| ❌ | TIMESTAMP_TRUNC |
| ❌ | FORMAT_TIMESTAMP |
| ❌ | PARSE_TIMESTAMP |
| ❌ | TIMESTAMP_SECONDS |
| ❌ | TIMESTAMP_MILLIS |
| ❌ | TIMESTAMP_MICROS |
| ❌ | UNIX_SECONDS |
| ❌ | UNIX_MILLIS |
| ❌ | UNIX_MICROS |

## Geography functions
|  | function |
|---|---|
| ❌ | Categories |
| ❌ | ST_AREA |
| ❌ | ST_ASBINARY |
| ❌ | ST_ASGEOJSON |
| ❌ | ST_ASTEXT |
| ❌ | ST_BOUNDARY |
| ❌ | ST_CENTROID |
| ❌ | ST_CENTROID_AGG |
| ❌ | ST_CLOSESTPOINT |
| ❌ | ST_CLUSTERDBSCAN |
| ❌ | ST_CONTAINS |
| ❌ | ST_CONVEXHULL |
| ❌ | ST_COVEREDBY |
| ❌ | ST_COVERS |
| ❌ | ST_DIFFERENCE |
| ❌ | ST_DIMENSION |
| ❌ | ST_DISJOINT |
| ❌ | ST_DISTANCE |
| ❌ | ST_DUMP |
| ❌ | ST_DWITHIN |
| ❌ | ST_ENDPOINT |
| ❌ | ST_EQUALS |
| ❌ | ST_GEOGFROMGEOJSON |
| ❌ | ST_GEOGFROMTEXT |
| ❌ | ST_GEOGFROMWKB |
| ❌ | ST_GEOGPOINT |
| ❌ | ST_GEOGPOINTFROMGEOHASH |
| ❌ | ST_GEOHASH |
| ❌ | ST_INTERSECTION |
| ❌ | ST_INTERSECTS |
| ❌ | ST_INTERSECTSBOX |
| ❌ | ST_ISCOLLECTION |
| ❌ | ST_ISEMPTY |
| ❌ | ST_LENGTH |
| ❌ | ST_MAKELINE |
| ❌ | ST_MAKEPOLYGON |
| ❌ | ST_MAKEPOLYGONORIENTED |
| ❌ | ST_MAXDISTANCE |
| ❌ | ST_NPOINTS |
| ❌ | ST_NUMPOINTS |
| ❌ | ST_PERIMETER |
| ❌ | ST_POINTN |
| ❌ | ST_SIMPLIFY |
| ❌ | ST_SNAPTOGRID |
| ❌ | ST_STARTPOINT |
| ❌ | ST_TOUCHES |
| ❌ | ST_UNION |
| ❌ | ST_UNION_AGG |
| ❌ | ST_WITHIN |
| ❌ | ST_X |
| ❌ | ST_Y |

## Security functions
|  | function |
|---|---|
| ❌ | SESSION_USER |

## UUID functions
|  | function |
|---|---|
| ❌ | GENERATE_UUID |

## Net functions
|  | function |
|---|---|
| ❌ | NET.IP_FROM_STRING |
| ❌ | NET.SAFE_IP_FROM_STRING |
| ❌ | NET.IP_TO_STRING |
| ❌ | NET.IP_NET_MASK |
| ❌ | NET.IP_TRUNC |
| ❌ | NET.IPV4_FROM_INT64 |
| ❌ | NET.IPV4_TO_INT64 |
| ❌ | NET.HOST |
| ❌ | NET.PUBLIC_SUFFIX |
| ❌ | NET.REG_DOMAIN |

## Operators
|  | function |
|---|---|
| ❌ | Element access operators |
| ❌ | Arithmetic operators |
| ❌ | Date arithmetics operators |
| ❌ | Bitwise operators |
| ❌ | Logical operators |
| ❌ | Comparison operators |
| ✅ | IN operators |
| ✅ | IS operators |
| ❌ | Concatenation operator |

## Conditional expressions
|  | function |
|---|---|
| ❌ | CASE expr |
| ❌ | CASE |
| ❌ | COALESCE |
| ❌ | IF |
| ❌ | IFNULL |
| ❌ | NULLIF |
