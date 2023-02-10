# Function support

## Aggregate functions
There is currently a limitation in the backing PostgreSQL (_DISTINCT is not implemented for window functions_),
so you can not write such query:
```SQL
SELECT COUNT(DISTINCT x) OVER (…)
```


|  | function                                                                                                               |
|---|------------------------------------------------------------------------------------------------------------------------|
| ✅ | [ANY_VALUE](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#any_value)               |
| ✅ | [ARRAY_AGG](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#array_agg)               |
| ❌ | [ARRAY_CONCAT_AGG](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#array_concat_agg) |
| ✅ | [AVG](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#avg)                           |
| ✅ | [BIT_AND](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#bit_and)                   |
| ✅ | [BIT_OR](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#bit_or)                     |
| ✅ | [BIT_XOR](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#bit_xor)                   |
| ✅ | [COUNT](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#count)                       |
| ✅ | [COUNTIF](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#countif)                   |
| ✅ | [LOGICAL_AND](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#logical_and)           |
| ✅ | [LOGICAL_OR](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#logical_or)             |
| ✅ | [MAX](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#max)                           |
| ✅ | [MIN](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#min)                           |
| ✅ | [STRING_AGG](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#string_agg)             |
| ✅ | [SUM](https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#sum)                           |

## Statistical aggregate functions
|  | function                                                                                                                 |
|---|--------------------------------------------------------------------------------------------------------------------------|
| ❌ | [CORR](https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#corr)               |
| ❌ | [COVAR_POP](https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#covar_pop)     |
| ❌ | [COVAR_SAMP](https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#covar_samp)   |
| ❌ | [STDDEV_POP](https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev_pop)   |
| ❌ | [STDDEV_SAMP](https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev_samp) |
| ❌ | [STDDEV](https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev)           |
| ❌ | [VAR_POP](https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#var_pop)         |
| ❌ | [VAR_SAMP](https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#var_samp)       |
| ❌ | [VARIANCE](https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#variance)       |

## Approximate aggregate functions
|  | function                                                                                                                                     |
|---|----------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | [APPROX_COUNT_DISTINCT](https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_count_distinct) |
| ❌ | [APPROX_QUANTILES](https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_quantiles)           |
| ❌ | [APPROX_TOP_COUNT](https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_top_count)           |
| ❌ | [APPROX_TOP_SUM](https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_top_sum)               |

## HyperLogLog
|  | function                                                                                                                       |
|---|--------------------------------------------------------------------------------------------------------------------------------|
| ❌ | [HLL_COUNT.INIT](https://cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions#hll_count.init)                   |
| ❌ | [HLL_COUNT.MERGE](https://cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions#hll_count.merge)                 |
| ❌ | [HLL_COUNT.MERGE_PARTIAL](https://cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions#hll_count.merge_partial) |
| ❌ | [HLL_COUNT.EXTRACT](https://cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions#hll_count.extract)             |

## Numbering functions
|  | function                                                                                                       |
|---|----------------------------------------------------------------------------------------------------------------|
| ❌ | [RANK](https://cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#rank)                 |
| ❌ | [DENSE_RANK](https://cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#dense_rank)     |
| ❌ | [PERCENT_RANK](https://cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#percent_rank) |
| ❌ | [CUME_DIST](https://cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#cume_dist)       |
| ❌ | [NTILE](https://cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#ntile)               |
| ❌ | [ROW_NUMBER](https://cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#row_number)     |

## Bit functions
|  | function                                                                                            |
|---|-----------------------------------------------------------------------------------------------------|
| ❌ | [BIT_COUNT](https://cloud.google.com/bigquery/docs/reference/standard-sql/bit_functions#bit_count) |

## Conversion functions
|  | function                                                                                                                    |
|---|-----------------------------------------------------------------------------------------------------------------------------|
| ❌ | [CAST AS ARRAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as array)           |
| ❌ | [CAST AS BIGNUMERIC](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as bignumeric) |
| ❌ | [CAST AS BOOL](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as bool)             |
| ❌ | [CAST AS BYTES](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as bytes)           |
| ❌ | [CAST AS DATE](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as date)             |
| ❌ | [CAST AS DATETIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as datetime)     |
| ❌ | [CAST AS FLOAT64](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as float64)       |
| ✅ | [CAST AS INT64](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as int64)           |
| ❌ | [CAST AS NUMERIC](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as numeric)       |
| ❌ | [CAST AS STRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as string)         |
| ❌ | [CAST AS STRUCT](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as struct)         |
| ❌ | [CAST AS TIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as time)             |
| ❌ | [CAST AS TIMESTAMP](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast as timestamp)   |
| ❌ | [SAFE_CAST](https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#safe_cast)                   |

## Mathematical functions
|   | function                                                                                                            |
|---|---------------------------------------------------------------------------------------------------------------------|
| ✅ | [ABS](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#abs)                     |
| ✅ | [SIGN](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sign)                   |
| ✅ | [IS_INF](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#is_inf)               |
| ✅ | [IS_NAN](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#is_nan)               |
| ✅ | [IEEE_DIVIDE](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#ieee_divide)     |
| ✅ | [RAND](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#rand)                   |
| ❌ | [SQRT](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sqrt)                   |
| ❌ | [POW](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#pow)                     |
| ❌ | [POWER](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#power)                 |
| ✅ | [EXP](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#exp)                     |
| ✅ | [LN](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#ln)                       |
| ❌ | [LOG](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#log)                     |
| ❌ | [LOG10](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#log10)                 |
| ❌ | [GREATEST](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#greatest)           |
| ❌ | [LEAST](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#least)                 |
| ✅ | [DIV](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#div)                     |
| ❌ | [SAFE_DIVIDE](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_divide)     |
| ❌ | [SAFE_MULTIPLY](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_multiply) |
| ❌ | [SAFE_NEGATE](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_negate)     |
| ❌ | [SAFE_ADD](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_add)           |
| ❌ | [SAFE_SUBTRACT](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_subtract) |
| ❌ | [MOD](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#mod)                     |
| ❌ | [ROUND](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#round)                 |
| ❌ | [TRUNC](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#trunc)                 |
| ✅ | [CEIL](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#ceil)                   |
| ✅ | [CEILING](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#ceiling)             |
| ✅ | [FLOOR](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#floor)                 |
| ✅ | [COS](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#cos)                     |
| ✅ | [COSH](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#cosh)                   |
| ✅ | [ACOS](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#acos)                   |
| ✅ | [ACOSH](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#acosh)                 |
| ❌ | [SIN](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sin)                     |
| ❌ | [SINH](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sinh)                   |
| ✅ | [ASIN](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#asin)                   |
| ✅ | [ASINH](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#asinh)                 |
| ❌ | [TAN](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#tan)                     |
| ❌ | [TANH](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#tanh)                   |
| ✅ | [ATAN](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#atan)                   |
| ✅ | [ATANH](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#atanh)                 |
| ❌ | [ATAN2](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#atan2)                 |
| ❌ | [RANGE_BUCKET](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#range_bucket)   |

## Navigation functions
|  | function                                                                                                              |
|---|-----------------------------------------------------------------------------------------------------------------------|
| ❌ | [FIRST_VALUE](https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#first_value)         |
| ❌ | [LAST_VALUE](https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#last_value)           |
| ❌ | [NTH_VALUE](https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#nth_value)             |
| ❌ | [LEAD](https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#lead)                       |
| ❌ | [LAG](https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#lag)                         |
| ❌ | [PERCENTILE_CONT](https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#percentile_cont) |
| ❌ | [PERCENTILE_DISC](https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#percentile_disc) |

## Aggregate analytic functions
|  | function |
|---|---|

## Hash functions
|  | function                                                                                                          |
|---|-------------------------------------------------------------------------------------------------------------------|
| ❌ | [FARM_FINGERPRINT](https://cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions#farm_fingerprint) |
| ❌ | [MD5](https://cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions#md5)                           |
| ❌ | [SHA1](https://cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions#sha1)                         |
| ❌ | [SHA256](https://cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions#sha256)                     |
| ❌ | [SHA512](https://cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions#sha512)                     |

## String functions
|    | function                                                                                                                                    |
|----|---------------------------------------------------------------------------------------------------------------------------------------------|
| ✅  | [ASCII](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#ascii)                                               |
| ✅  | [BYTE_LENGTH](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#byte_length)                                   |
| ✅  | [CHAR_LENGTH](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#char_length)                                   |
| ✅  | [CHARACTER_LENGTH](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#character_length)                         |
| ✅  | [CHR](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#chr)                                                   |
| ❌  | [CODE_POINTS_TO_BYTES](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#code_points_to_bytes)                 |
| ❌  | [CODE_POINTS_TO_STRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#code_points_to_string)               |
| ✅  | [CONCAT](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#concat)                                             |
| ✅  | [ENDS_WITH](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#ends_with)                                       |
| ❌  | [FORMAT](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#format)                                             |
| ❌  | [FROM_BASE32](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#from_base32)                                   |
| ✅  | [FROM_BASE64](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#from_base64)                                   |
| ✅  | [FROM_HEX](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#from_hex)                                         |
| ❌  | [INITCAP](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#initcap)                                           |
| ⚠️ | [INSTR](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#instr) (negative position is not supported yet)      |
| ✅  | [LEFT](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#left)                                                 |
| ✅  | [LENGTH](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#length)                                             |
| ✅  | [LPAD](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#lpad)                                                 |
| ✅  | [LOWER](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#lower)                                               |
| ✅  | [LTRIM](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#ltrim)                                               |
| ❌  | [NORMALIZE](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#normalize)                                       |
| ❌  | [NORMALIZE_AND_CASEFOLD](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#normalize_and_casefold)             |
| ❌  | [OCTET_LENGTH](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#octet_length)                                 |
| ❌  | [REGEXP_CONTAINS](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_contains)                           |
| ❌  | [REGEXP_EXTRACT](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_extract)                             |
| ❌  | [REGEXP_EXTRACT_ALL](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_extract_all)                     |
| ✅  | [REGEXP_INSTR](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_instr)                                 |
| ❌  | [REGEXP_REPLACE](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_replace)                             |
| ✅  | [REGEXP_SUBSTR](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_substr)                               |
| ✅  | [REPLACE](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#replace)                                           |
| ✅  | [REPEAT](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#repeat)                                             |
| ✅  | [REVERSE](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#reverse)                                           |
| ✅  | [RIGHT](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#right)                                               |
| ✅  | [RPAD](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#rpad)                                                 |
| ✅  | [RTRIM](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#rtrim)                                               |
| ❌  | [SAFE_CONVERT_BYTES_TO_STRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#safe_convert_bytes_to_string) |
| ❌  | [SOUNDEX](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#soundex)                                           |
| ❌  | [SPLIT](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#split)                                               |
| ✅  | [STARTS_WITH](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#starts_with)                                   |
| ✅  | [STRPOS](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#strpos)                                             |
| ✅  | [SUBSTR](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#substr)                                             |
| ❌  | [SUBSTRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#substring)                                       |
| ❌  | [TO_BASE32](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#to_base32)                                       |
| ✅  | [TO_BASE64](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#to_base64)                                       |
| ❌  | [TO_CODE_POINTS](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#to_code_points)                             |
| ✅  | [TO_HEX](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#to_hex)                                             |
| ✅  | [TRANSLATE](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#translate)                                       |
| ✅  | [TRIM](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#trim)                                                 |
| ❌  | [UNICODE](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#unicode)                                           |
| ✅  | [UPPER](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#upper)                                               |

## JSON functions
|  | function                                                                                                                            |
|---|-------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | [JSON_EXTRACT](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_extract)                           |
| ❌ | [JSON_QUERY](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_query)                               |
| ❌ | [JSON_EXTRACT_SCALAR](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_extract_scalar)             |
| ❌ | [JSON_VALUE](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_value)                               |
| ❌ | [JSON_EXTRACT_ARRAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_extract_array)               |
| ❌ | [JSON_QUERY_ARRAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_query_array)                   |
| ❌ | [JSON_EXTRACT_STRING_ARRAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_extract_string_array) |
| ❌ | [JSON_VALUE_ARRAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_value_array)                   |
| ✅ | [TO_JSON_STRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#to_json_string)                       |

## Array functions
|   | function                                                                                                                                                                                                                   |
|---|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | [ARRAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#array)                                                                                                                               |
| ❌ | [ARRAY_CONCAT](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#array_concat)                                                                                                                 |
| ❌ | [ARRAY_LENGTH](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#array_length)                                                                                                                 |
| ❌ | [ARRAY_TO_STRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#array_to_string)                                                                                                           |
| ❌ | [GENERATE_ARRAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#generate_array)                                                                                                             |
| ✅ | [GENERATE_DATE_ARRAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#generate_date_array)                                                                                                   |
| ❌ | [GENERATE_TIMESTAMP_ARRAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#generate_timestamp_array)                                                                                         |
| ❌ | [OFFSET](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#offset_and_ordinal) and [ORDINAL](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#offset_and_ordinal) |
| ❌ | [ARRAY_REVERSE](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions#array_reverse)                                                                                                               |

## Date functions
|  | function                                                                                                                                                                                                    |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⚠️ | [CURRENT_DATE](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#current_date) (no timezone support)                                                                             |
| ⚠️ | [EXTRACT](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#extract) (WEEK(<WEEKDAY>) is not supported, translated as WEEK)                                                      |
| ✅ | [DATE](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date)                                                                                                                   |
| ✅ | [DATE_ADD](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_add)                                                                                                           |
| ✅ | [DATE_SUB](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_sub)                                                                                                           |
| ⚠️ | [DATE_DIFF](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_diff) (QUARTER, ISOWEEK and WEEK(<WEEKDAY>) is not supported)                                                 |
| ⚠️ | [DATE_TRUNC](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_trunc) (WEEK(<WEEKDAY>) is not supported)                                                                    |
| ❌ | [DATE_FROM_UNIX_DATE](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_from_unix_date)                                                                                     |
| ⚠️ | [FORMAT_DATE](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#format_date) ("w": The weekday (Sunday as the first day of the week) as a decimal number (1-7) instead of (0-6)) |
| ✅ | [LAST_DAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#last_day)                                                                                                           |
| ✅ | [PARSE_DATE](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#parse_date)                                                                                                       |
| ❌ | [UNIX_DATE](https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#unix_date)                                                                                                         |

## Datetime functions
|  | function                                                                                                              |
|---|-----------------------------------------------------------------------------------------------------------------------|
| ❌ | [CURRENT_DATETIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#current_datetime) |
| ❌ | [DATETIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#datetime)                 |
| ❌ | [EXTRACT](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#extract)                   |
| ❌ | [DATETIME_ADD](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#datetime_add)         |
| ❌ | [DATETIME_SUB](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#datetime_sub)         |
| ❌ | [DATETIME_DIFF](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#datetime_diff)       |
| ❌ | [DATETIME_TRUNC](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#datetime_trunc)     |
| ❌ | [FORMAT_DATETIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#format_datetime)   |
| ❌ | [LAST_DAY](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#last_day)                 |
| ❌ | [PARSE_DATETIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions#parse_datetime)     |

## Time functions
|  | function                                                                                                                        |
|---|---------------------------------------------------------------------------------------------------------------------------------|
| ⚠️ | [CURRENT_TIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#current_time) (no timezone support) |
| ✅ | [TIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time)                                       |
| ✅ | [EXTRACT](https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#extract)                                 |
| ❌ | [TIME_ADD](https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time_add)                               |
| ❌ | [TIME_SUB](https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time_sub)                               |
| ❌ | [TIME_DIFF](https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time_diff)                             |
| ❌ | [TIME_TRUNC](https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time_trunc)                           |
| ❌ | [FORMAT_TIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#format_time)                         |
| ❌ | [PARSE_TIME](https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#parse_time)                           |

## Timestamp functions
|  | function                                                                                                                 |
|---|--------------------------------------------------------------------------------------------------------------------------|
| ❌ | [CURRENT_TIMESTAMP](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#current_timestamp) |
| ❌ | [EXTRACT](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#extract)                     |
| ❌ | [STRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#string)                       |
| ❌ | [TIMESTAMP](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp)                 |
| ❌ | [TIMESTAMP_ADD](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_add)         |
| ❌ | [TIMESTAMP_SUB](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_sub)         |
| ❌ | [TIMESTAMP_DIFF](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_diff)       |
| ❌ | [TIMESTAMP_TRUNC](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc)     |
| ❌ | [FORMAT_TIMESTAMP](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#format_timestamp)   |
| ❌ | [PARSE_TIMESTAMP](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#parse_timestamp)     |
| ❌ | [TIMESTAMP_SECONDS](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_seconds) |
| ❌ | [TIMESTAMP_MILLIS](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_millis)   |
| ❌ | [TIMESTAMP_MICROS](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_micros)   |
| ❌ | [UNIX_SECONDS](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#unix_seconds)           |
| ❌ | [UNIX_MILLIS](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#unix_millis)             |
| ❌ | [UNIX_MICROS](https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#unix_micros)             |

## Geography functions
|  | function                                                                                                                             |
|---|--------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | [ST_AREA](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_area)                                 |
| ❌ | [ST_ASBINARY](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_asbinary)                         |
| ❌ | [ST_ASGEOJSON](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_asgeojson)                       |
| ❌ | [ST_ASTEXT](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_astext)                             |
| ❌ | [ST_BOUNDARY](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_boundary)                         |
| ❌ | [ST_CENTROID](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_centroid)                         |
| ❌ | [ST_CENTROID_AGG](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_centroid_agg)                 |
| ❌ | [ST_CLOSESTPOINT](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_closestpoint)                 |
| ❌ | [ST_CLUSTERDBSCAN](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_clusterdbscan)               |
| ❌ | [ST_CONTAINS](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_contains)                         |
| ❌ | [ST_CONVEXHULL](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_convexhull)                     |
| ❌ | [ST_COVEREDBY](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_coveredby)                       |
| ❌ | [ST_COVERS](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_covers)                             |
| ❌ | [ST_DIFFERENCE](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_difference)                     |
| ❌ | [ST_DIMENSION](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_dimension)                       |
| ❌ | [ST_DISJOINT](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_disjoint)                         |
| ❌ | [ST_DISTANCE](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_distance)                         |
| ❌ | [ST_DUMP](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_dump)                                 |
| ❌ | [ST_DWITHIN](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_dwithin)                           |
| ❌ | [ST_ENDPOINT](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_endpoint)                         |
| ❌ | [ST_EQUALS](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_equals)                             |
| ❌ | [ST_GEOGFROMGEOJSON](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geogfromgeojson)           |
| ❌ | [ST_GEOGFROMTEXT](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geogfromtext)                 |
| ❌ | [ST_GEOGFROMWKB](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geogfromwkb)                   |
| ❌ | [ST_GEOGPOINT](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geogpoint)                       |
| ❌ | [ST_GEOGPOINTFROMGEOHASH](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geogpointfromgeohash) |
| ❌ | [ST_GEOHASH](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geohash)                           |
| ❌ | [ST_INTERSECTION](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_intersection)                 |
| ❌ | [ST_INTERSECTS](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_intersects)                     |
| ❌ | [ST_INTERSECTSBOX](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_intersectsbox)               |
| ❌ | [ST_ISCOLLECTION](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_iscollection)                 |
| ❌ | [ST_ISEMPTY](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_isempty)                           |
| ❌ | [ST_LENGTH](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_length)                             |
| ❌ | [ST_MAKELINE](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_makeline)                         |
| ❌ | [ST_MAKEPOLYGON](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_makepolygon)                   |
| ❌ | [ST_MAKEPOLYGONORIENTED](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_makepolygonoriented)   |
| ❌ | [ST_MAXDISTANCE](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_maxdistance)                   |
| ❌ | [ST_NPOINTS](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_npoints)                           |
| ❌ | [ST_NUMPOINTS](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_numpoints)                       |
| ❌ | [ST_PERIMETER](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_perimeter)                       |
| ❌ | [ST_POINTN](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_pointn)                             |
| ❌ | [ST_SIMPLIFY](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_simplify)                         |
| ❌ | [ST_SNAPTOGRID](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_snaptogrid)                     |
| ❌ | [ST_STARTPOINT](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_startpoint)                     |
| ❌ | [ST_TOUCHES](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_touches)                           |
| ❌ | [ST_UNION](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_union)                               |
| ❌ | [ST_UNION_AGG](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_union_agg)                       |
| ❌ | [ST_WITHIN](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_within)                             |
| ❌ | [ST_X](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_x)                                       |
| ❌ | [ST_Y](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_y)                                       |

## Security functions
|  | function                                                                                                      |
|---|---------------------------------------------------------------------------------------------------------------|
| ❌ | [SESSION_USER](https://cloud.google.com/bigquery/docs/reference/standard-sql/security_functions#session_user) |

## Utility functions
|  | function                                                                                                        |
|---|-----------------------------------------------------------------------------------------------------------------|
| ❌ | [GENERATE_UUID](https://cloud.google.com/bigquery/docs/reference/standard-sql/utility-functions#generate_uuid)  |

## Net functions
|  | function                                                                                                                       |
|---|--------------------------------------------------------------------------------------------------------------------------------|
| ❌ | [NET.IP_FROM_STRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.ip_from_string)           |
| ❌ | [NET.SAFE_IP_FROM_STRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.safe_ip_from_string) | 
| ❌ | [NET.IP_TO_STRING](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.ip_to_string)               |
| ❌ | [NET.IP_NET_MASK](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.ip_net_mask)                 |
| ❌ | [NET.IP_TRUNC](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.ip_trunc)                       |
| ❌ | [NET.IPV4_FROM_INT64](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.ipv4_from_int64)         |
| ❌ | [NET.IPV4_TO_INT64](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.ipv4_to_int64)             |
| ❌ | [NET.HOST](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.host)                               |
| ❌ | [NET.PUBLIC_SUFFIX](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.public_suffix)             |
| ❌ | [NET.REG_DOMAIN](https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#net.reg_domain)                   |

## Operators
|  | function                   |
|---|----------------------------|
| ❌ | Element access operators   |
| ❌ | Arithmetic operators       |
| ❌ | Date arithmetics operators |
| ❌ | Bitwise operators          |
| ❌ | Logical operators          |
| ❌ | Comparison operators       |
| ✅ | IN operators               |
| ✅ | IS operators               |
| ❌ | Concatenation operator     |

## Conditional expressions
|  | function                                                                                                     |
|---|--------------------------------------------------------------------------------------------------------------|
| ❌ | [CASE expr](https://cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions#case_expr) |                                                                                          |
| ❌ | [CASE](https://cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions#case)           |
| ❌ | [COALESCE](https://cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions#coalesce)   |
| ❌ | [IF](https://cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions#if)               |
| ❌ | [IFNULL](https://cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions#ifnull)       |
| ❌ | [NULLIF](https://cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions#nullif)       |
