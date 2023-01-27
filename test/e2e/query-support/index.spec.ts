import moment from 'moment-timezone';
import runTestCaseFactory, { EXPECTATIONS } from '../_common/run-test-case';
import { expect } from 'chai';

const runTestCase = runTestCaseFactory(__dirname);
const { NOT_ORDERED } = EXPECTATIONS;

describe('SQL Function support', function() {
  context('aggregate_functions functions', function() {
    describe('ANY_VALUE', function() {
      it.skip('example-1', runTestCase('./testcases/aggregate_functions/any_value/1.txt'));
      it('example-2', runTestCase('./testcases/aggregate_functions/any_value/2.txt', NOT_ORDERED));
    });
    describe('ARRAY_AGG', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/array_agg/1.txt'));
      it('example-2', runTestCase('./testcases/aggregate_functions/array_agg/2.txt'));
      it('example-3', runTestCase('./testcases/aggregate_functions/array_agg/3.txt'));
      it('example-4', runTestCase('./testcases/aggregate_functions/array_agg/4.txt'));
      it('example-5', runTestCase('./testcases/aggregate_functions/array_agg/5.txt'));
      it('example-6', runTestCase('./testcases/aggregate_functions/array_agg/6.txt'));
      it('example-7', runTestCase('./testcases/aggregate_functions/array_agg/7.txt', NOT_ORDERED));
    });
    describe.skip('ARRAY_CONCAT_AGG', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/array_concat_agg/1.txt'));
      it('example-2', runTestCase('./testcases/aggregate_functions/array_concat_agg/2.txt'));
      it('example-3', runTestCase('./testcases/aggregate_functions/array_concat_agg/3.txt'));
      it('example-4', runTestCase('./testcases/aggregate_functions/array_concat_agg/4.txt'));
    });
    describe('AVG', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/avg/1.txt'));
      it('example-2', runTestCase('./testcases/aggregate_functions/avg/2.txt'));
      it('example-3', runTestCase('./testcases/aggregate_functions/avg/3.txt'));
    });
    describe('BIT_AND', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/bit_and/1.txt'));
    });
    describe('BIT_OR', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/bit_or/1.txt'));
    });
    describe('BIT_XOR', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/bit_xor/1.txt'));
      it('example-2', runTestCase('./testcases/aggregate_functions/bit_xor/2.txt'));
      it('example-3', runTestCase('./testcases/aggregate_functions/bit_xor/3.txt'));
    });
    describe('COUNT', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/count/1.txt'));
      it.skip('example-2', runTestCase('./testcases/aggregate_functions/count/2.txt'));
      it.skip('example-3', runTestCase('./testcases/aggregate_functions/count/3.txt'));
    });
    describe('COUNTIF', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/countif/1.txt'));
      it.skip('example-2', runTestCase('./testcases/aggregate_functions/countif/2.txt'));
    });
    describe('LOGICAL_AND', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/logical_and/1.txt'));
    });
    describe('LOGICAL_OR', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/logical_or/1.txt'));
    });
    describe('MAX', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/max/1.txt'));
      it('example-2', runTestCase('./testcases/aggregate_functions/max/2.txt', NOT_ORDERED));
    });
    describe('MIN', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/min/1.txt'));
      it('example-2', runTestCase('./testcases/aggregate_functions/min/2.txt', NOT_ORDERED));
    });
    describe('STRING_AGG', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/string_agg/1.txt'));
      it('example-2', runTestCase('./testcases/aggregate_functions/string_agg/2.txt'));
      it('example-3', runTestCase('./testcases/aggregate_functions/string_agg/3.txt'));
      it('example-4', runTestCase('./testcases/aggregate_functions/string_agg/4.txt'));
      it('example-5', runTestCase('./testcases/aggregate_functions/string_agg/5.txt'));
      it('example-6', runTestCase('./testcases/aggregate_functions/string_agg/6.txt'));
      it('example-7', runTestCase('./testcases/aggregate_functions/string_agg/7.txt'));
    });
    describe('SUM', function() {
      it('example-1', runTestCase('./testcases/aggregate_functions/sum/1.txt'));
      it('example-2', runTestCase('./testcases/aggregate_functions/sum/2.txt'));
      it('example-3', runTestCase('./testcases/aggregate_functions/sum/3.txt'));
      it.skip('example-4', runTestCase('./testcases/aggregate_functions/sum/4.txt'));
      it('example-5', runTestCase('./testcases/aggregate_functions/sum/5.txt'));
    });
  });
  context('string_functions functions', function() {
    describe('ASCII', function() {
      it('example-1', runTestCase('./testcases/string_functions/ascii/1.txt'));
    });
    describe.skip('BYTE_LENGTH', function() {
      it('example-1', runTestCase('./testcases/string_functions/byte_length/1.txt'));
    });
    describe('CHAR_LENGTH', function() {
      it('example-1', runTestCase('./testcases/string_functions/char_length/1.txt'));
    });
    describe('CHARACTER_LENGTH', function() {
      it('example-1', runTestCase('./testcases/string_functions/character_length/1.txt'));
    });
    describe('CHR', function() {
      it('example-1', runTestCase('./testcases/string_functions/chr/1.txt'));
      it.skip('example-2', runTestCase('./testcases/string_functions/chr/2.txt'));
    });
    describe.skip('CODE_POINTS_TO_BYTES', function() {
      it('example-1', runTestCase('./testcases/string_functions/code_points_to_bytes/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/code_points_to_bytes/2.txt'));
    });
    describe.skip('CODE_POINTS_TO_STRING', function() {
      it('example-1', runTestCase('./testcases/string_functions/code_points_to_string/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/code_points_to_string/2.txt'));
      it('example-3', runTestCase('./testcases/string_functions/code_points_to_string/3.txt'));
      it('example-4', runTestCase('./testcases/string_functions/code_points_to_string/4.txt'));
    });
    describe('CONCAT', function() {
      it('example-1', runTestCase('./testcases/string_functions/concat/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/concat/2.txt'));
      it('example-3', runTestCase('./testcases/string_functions/concat/3.txt'));
    });
    describe.skip('ENDS_WITH', function() {
      it('example-1', runTestCase('./testcases/string_functions/ends_with/1.txt'));
    });
    describe.skip('FROM_BASE32', function() {
      it('example-1', runTestCase('./testcases/string_functions/from_base32/1.txt'));
    });
    describe.skip('FROM_BASE64', function() {
      it('example-1', runTestCase('./testcases/string_functions/from_base64/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/from_base64/2.txt'));
    });
    describe.skip('FROM_HEX', function() {
      it('example-1', runTestCase('./testcases/string_functions/from_hex/1.txt'));
    });
    describe.skip('INITCAP', function() {
      it('example-1', runTestCase('./testcases/string_functions/initcap/1.txt'));
    });
    describe.skip('INSTR', function() {
      it('example-1', runTestCase('./testcases/string_functions/instr/1.txt'));
    });
    describe('LEFT', function() {
      it('example-1', runTestCase('./testcases/string_functions/left/1.txt'));
      it.skip('example-2', runTestCase('./testcases/string_functions/left/2.txt'));
    });
    describe('LENGTH', function() {
      it('example-1', runTestCase('./testcases/string_functions/length/1.txt'));
    });
    describe.skip('LPAD', function() {
      it('example-1', runTestCase('./testcases/string_functions/lpad/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/lpad/2.txt'));
      it('example-3', runTestCase('./testcases/string_functions/lpad/3.txt'));
      it('example-4', runTestCase('./testcases/string_functions/lpad/4.txt'));
    });
    describe('LOWER', function() {
      it('example-1', runTestCase('./testcases/string_functions/lower/1.txt'));
    });
    describe('LTRIM', function() {
      it('example-1', runTestCase('./testcases/string_functions/ltrim/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/ltrim/2.txt'));
      it.skip('example-3', runTestCase('./testcases/string_functions/ltrim/3.txt'));
    });
    describe.skip('NORMALIZE', function() {
      it('example-1', runTestCase('./testcases/string_functions/normalize/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/normalize/2.txt'));
    });
    describe.skip('NORMALIZE_AND_CASEFOLD', function() {
      it('example-1', runTestCase('./testcases/string_functions/normalize_and_casefold/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/normalize_and_casefold/2.txt'));
    });
    describe.skip('REGEXP_CONTAINS', function() {
      it('example-1', runTestCase('./testcases/string_functions/regexp_contains/1.txt'));
    });
    describe.skip('REGEXP_EXTRACT', function() {
      it('example-1', runTestCase('./testcases/string_functions/regexp_extract/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/regexp_extract/2.txt'));
      it('example-3', runTestCase('./testcases/string_functions/regexp_extract/3.txt'));
    });
    describe.skip('REGEXP_EXTRACT_ALL', function() {
      it('example-1', runTestCase('./testcases/string_functions/regexp_extract_all/1.txt'));
    });
    describe.skip('REGEXP_INSTR', function() {
      it('example-1', runTestCase('./testcases/string_functions/regexp_instr/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/regexp_instr/2.txt'));
      it('example-3', runTestCase('./testcases/string_functions/regexp_instr/3.txt'));
      it('example-4', runTestCase('./testcases/string_functions/regexp_instr/4.txt'));
    });
    describe.skip('REGEXP_REPLACE', function() {
      it('example-1', runTestCase('./testcases/string_functions/regexp_replace/1.txt'));
    });
    describe.skip('REGEXP_SUBSTR', function() {
      it('example-1', runTestCase('./testcases/string_functions/regexp_substr/1.txt'));
    });
    describe('REPLACE', function() {
      it('example-1', runTestCase('./testcases/string_functions/replace/1.txt'));
    });
    describe.skip('REPEAT', function() {
      it('example-1', runTestCase('./testcases/string_functions/repeat/1.txt'));
    });
    describe.skip('REVERSE', function() {
      it('example-1', runTestCase('./testcases/string_functions/reverse/1.txt'));
    });
    describe('RIGHT', function() {
      it('example-1', runTestCase('./testcases/string_functions/right/1.txt'));
      it.skip('example-2', runTestCase('./testcases/string_functions/right/2.txt'));
    });
    describe.skip('RPAD', function() {
      it('example-1', runTestCase('./testcases/string_functions/rpad/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/rpad/2.txt'));
      it('example-3', runTestCase('./testcases/string_functions/rpad/3.txt'));
      it('example-4', runTestCase('./testcases/string_functions/rpad/4.txt'));
    });
    describe('RTRIM', function() {
      it('example-1', runTestCase('./testcases/string_functions/rtrim/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/rtrim/2.txt'));
    });
    describe.skip('SOUNDEX', function() {
      it('example-1', runTestCase('./testcases/string_functions/soundex/1.txt'));
    });
    describe.skip('SPLIT', function() {
      it('example-1', runTestCase('./testcases/string_functions/split/1.txt'));
    });
    describe.skip('STARTS_WITH', function() {
      it('example-1', runTestCase('./testcases/string_functions/starts_with/1.txt'));
    });
    describe('STRPOS', function() {
      it('example-1', runTestCase('./testcases/string_functions/strpos/1.txt'));
    });
    describe('SUBSTR', function() {
      it('example-1', runTestCase('./testcases/string_functions/substr/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/substr/2.txt'));
      it.skip('example-3', runTestCase('./testcases/string_functions/substr/3.txt'));
    });
    describe.skip('TO_BASE32', function() {
      it('example-1', runTestCase('./testcases/string_functions/to_base32/1.txt'));
    });
    describe.skip('TO_BASE64', function() {
      it('example-1', runTestCase('./testcases/string_functions/to_base64/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/to_base64/2.txt'));
    });
    describe.skip('TO_CODE_POINTS', function() {
      it('example-1', runTestCase('./testcases/string_functions/to_code_points/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/to_code_points/2.txt'));
      it('example-3', runTestCase('./testcases/string_functions/to_code_points/3.txt'));
    });
    describe.skip('TO_HEX', function() {
      it('example-1', runTestCase('./testcases/string_functions/to_hex/1.txt'));
    });
    describe('TRANSLATE', function() {
      it('example-1', runTestCase('./testcases/string_functions/translate/1.txt'));
    });
    describe('TRIM', function() {
      it('example-1', runTestCase('./testcases/string_functions/trim/1.txt'));
      it('example-2', runTestCase('./testcases/string_functions/trim/2.txt'));
      it('example-3', runTestCase('./testcases/string_functions/trim/3.txt'));
    });
    describe.skip('UNICODE', function() {
      it('example-1', runTestCase('./testcases/string_functions/unicode/1.txt'));
    });
    describe('UPPER', function() {
      it('example-1', runTestCase('./testcases/string_functions/upper/1.txt'));
    });
  });
  context('array_functions functions', function() {
    describe.skip('ARRAY', function() {
      it('example-1', runTestCase('./testcases/array_functions/array/1.txt'));
      it('example-2', runTestCase('./testcases/array_functions/array/2.txt'));
      it('example-3', runTestCase('./testcases/array_functions/array/3.txt'));
    });
    describe.skip('ARRAY_CONCAT', function() {
      it('example-1', runTestCase('./testcases/array_functions/array_concat/1.txt'));
    });
    describe.skip('ARRAY_LENGTH', function() {
      it('example-1', runTestCase('./testcases/array_functions/array_length/1.txt'));
    });
    describe('ARRAY_TO_STRING', function() {
      it('example-1', runTestCase('./testcases/array_functions/array_to_string/1.txt'));
      it('example-2', runTestCase('./testcases/array_functions/array_to_string/2.txt'));
    });
    describe.skip('GENERATE_ARRAY', function() {
      it('example-1', runTestCase('./testcases/array_functions/generate_array/1.txt'));
      it('example-2', runTestCase('./testcases/array_functions/generate_array/2.txt'));
      it('example-3', runTestCase('./testcases/array_functions/generate_array/3.txt'));
      it('example-4', runTestCase('./testcases/array_functions/generate_array/4.txt'));
      it('example-5', runTestCase('./testcases/array_functions/generate_array/5.txt'));
      it('example-6', runTestCase('./testcases/array_functions/generate_array/6.txt'));
      it('example-7', runTestCase('./testcases/array_functions/generate_array/7.txt'));
    });
    describe.skip('GENERATE_DATE_ARRAY', function() {
      it('example-1', runTestCase('./testcases/array_functions/generate_date_array/1.txt'));
      it('example-2', runTestCase('./testcases/array_functions/generate_date_array/2.txt'));
      it('example-3', runTestCase('./testcases/array_functions/generate_date_array/3.txt'));
      it('example-4', runTestCase('./testcases/array_functions/generate_date_array/4.txt'));
      it('example-5', runTestCase('./testcases/array_functions/generate_date_array/5.txt'));
      it('example-6', runTestCase('./testcases/array_functions/generate_date_array/6.txt'));
      it('example-7', runTestCase('./testcases/array_functions/generate_date_array/7.txt'));
      it('example-8', runTestCase('./testcases/array_functions/generate_date_array/8.txt'));
    });
    describe.skip('GENERATE_TIMESTAMP_ARRAY', function() {
      it('example-1', runTestCase('./testcases/array_functions/generate_timestamp_array/1.txt'));
      it('example-2', runTestCase('./testcases/array_functions/generate_timestamp_array/2.txt'));
      it('example-3', runTestCase('./testcases/array_functions/generate_timestamp_array/3.txt'));
      it('example-4', runTestCase('./testcases/array_functions/generate_timestamp_array/4.txt'));
      it('example-5', runTestCase('./testcases/array_functions/generate_timestamp_array/5.txt'));
      it('example-6', runTestCase('./testcases/array_functions/generate_timestamp_array/6.txt'));
      it('example-7', runTestCase('./testcases/array_functions/generate_timestamp_array/7.txt'));
    });
    describe.skip('OFFSET_AND_ORDINAL', function() {
      it('example-1', runTestCase('./testcases/array_functions/offset_and_ordinal/1.txt'));
    });
    describe.skip('ARRAY_REVERSE', function() {
      it('example-1', runTestCase('./testcases/array_functions/array_reverse/1.txt'));
    });
    describe.skip('SAFE_OFFSET_AND_SAFE_ORDINAL', function() {
      it('example-1', runTestCase('./testcases/array_functions/safe_offset_and_safe_ordinal/1.txt'));
    });
  });
  context('date_functions functions', function() {
    describe.skip('CURRENT_DATE', function() {
      it('example-1', runTestCase('./testcases/date_functions/current_date/1.txt'));
      it('example-2', runTestCase('./testcases/date_functions/current_date/2.txt'));
    });
    describe('EXTRACT', function() {
      it('example-1', runTestCase('./testcases/date_functions/extract/1.txt'));
      it.skip('example-2', runTestCase('./testcases/date_functions/extract/2.txt'));
      it.skip('example-3', runTestCase('./testcases/date_functions/extract/3.txt'));
    });
    describe('DATE', function() {
      it('example-1', runTestCase('./testcases/date_functions/date/1.txt'));
    });
    describe('DATE_ADD', function() {
      it('example-1', runTestCase('./testcases/date_functions/date_add/1.txt'));
    });
    describe('DATE_SUB', function() {
      it('example-1', runTestCase('./testcases/date_functions/date_sub/1.txt'));
    });
    describe.skip('DATE_DIFF', function() {
      it('example-1', runTestCase('./testcases/date_functions/date_diff/1.txt'));
      it('example-2', runTestCase('./testcases/date_functions/date_diff/2.txt'));
      it('example-3', runTestCase('./testcases/date_functions/date_diff/3.txt'));
      it('example-4', runTestCase('./testcases/date_functions/date_diff/4.txt'));
    });
    describe('DATE_TRUNC', function() {
      it('example-1', runTestCase('./testcases/date_functions/date_trunc/1.txt'));
      it.skip('example-2', runTestCase('./testcases/date_functions/date_trunc/2.txt'));
      it.skip('example-3', runTestCase('./testcases/date_functions/date_trunc/3.txt'));
    });
    describe.skip('DATE_FROM_UNIX_DATE', function() {
      it('example-1', runTestCase('./testcases/date_functions/date_from_unix_date/1.txt'));
    });
    describe('FORMAT_DATE', function() {
      it('example-1', runTestCase('./testcases/date_functions/format_date/1.txt'));
      it('example-2', runTestCase('./testcases/date_functions/format_date/2.txt'));
      it('example-3', runTestCase('./testcases/date_functions/format_date/3.txt'));
    });
    describe.skip('LAST_DAY', function() {
      it('example-1', runTestCase('./testcases/date_functions/last_day/1.txt'));
      it('example-2', runTestCase('./testcases/date_functions/last_day/2.txt'));
      it('example-3', runTestCase('./testcases/date_functions/last_day/3.txt'));
      it('example-4', runTestCase('./testcases/date_functions/last_day/4.txt'));
      it('example-5', runTestCase('./testcases/date_functions/last_day/5.txt'));
    });
    describe.skip('PARSE_DATE', function() {
      it('example-1', runTestCase('./testcases/date_functions/parse_date/1.txt'));
      it('example-2', runTestCase('./testcases/date_functions/parse_date/2.txt'));
    });
    describe.skip('UNIX_DATE', function() {
      it('example-1', runTestCase('./testcases/date_functions/unix_date/1.txt'));
    });
  });
  context('time_functions functions', function() {
    describe('CURRENT_TIME', function() {
      it('example-1', runTestCase(
        './testcases/time_functions/current_time/1.txt',
        // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
        function(currentData, _expectedData) {
          expect(currentData[0].now).to.match(/^\d{2}:\d{2}:\d{2}.\d{6}$/);

          const expectedTime = moment().tz('UTC').format('HH:mm:ss.SSSSSS');
          const expectedTimeInMs = moment.duration(expectedTime).asMilliseconds();
          const actualTimeInMs = moment.duration(currentData[0].now).asMilliseconds();
          expect(actualTimeInMs)
            .to.be.approximately(expectedTimeInMs, 500);
        }
      ));
      it.skip('example-2', runTestCase('./testcases/time_functions/current_time/2.txt'));
    });
    describe('TIME', function() {
      it('example-1', runTestCase('./testcases/time_functions/time/1.txt'));
      it('example-2', runTestCase('./testcases/time_functions/time/2.txt'));
    });
    describe('EXTRACT_3', function() {
      it('example-1', runTestCase('./testcases/time_functions/extract_3/1.txt'));
    });
    describe.skip('TIME_ADD', function() {
      it('example-1', runTestCase('./testcases/time_functions/time_add/1.txt'));
    });
    describe.skip('TIME_SUB', function() {
      it('example-1', runTestCase('./testcases/time_functions/time_sub/1.txt'));
    });
    describe('TIME_DIFF', function() {
      it('example-1', runTestCase('./testcases/time_functions/time_diff/1.txt'));
    });
    describe.skip('TIME_TRUNC', function() {
      it('example-1', runTestCase('./testcases/time_functions/time_trunc/1.txt'));
    });
    describe.skip('FORMAT_TIME', function() {
      it('example-1', runTestCase('./testcases/time_functions/format_time/1.txt'));
    });
    describe.skip('PARSE_TIME', function() {
      it('example-1', runTestCase('./testcases/time_functions/parse_time/1.txt'));
      it('example-2', runTestCase('./testcases/time_functions/parse_time/2.txt'));
    });
  });
  context('conditional_expressions functions', function() {
    describe.skip('CASE_EXPR', function() {
      it('example-1', runTestCase('./testcases/conditional_expressions/case_expr/1.txt'));
    });
    describe('CASE', function() {
      it('example-1', runTestCase('./testcases/conditional_expressions/case/1.txt'));
    });
    describe('COALESCE', function() {
      it('example-1', runTestCase('./testcases/conditional_expressions/coalesce/1.txt'));
      it('example-2', runTestCase('./testcases/conditional_expressions/coalesce/2.txt'));
    });
    describe.skip('IF', function() {
      it('example-1', runTestCase('./testcases/conditional_expressions/if/1.txt'));
    });
    describe.skip('IFNULL', function() {
      it('example-1', runTestCase('./testcases/conditional_expressions/ifnull/1.txt'));
      it('example-2', runTestCase('./testcases/conditional_expressions/ifnull/2.txt'));
    });
    describe('NULLIF', function() {
      it('example-1', runTestCase('./testcases/conditional_expressions/nullif/1.txt'));
      it('example-2', runTestCase('./testcases/conditional_expressions/nullif/2.txt'));
    });
  });
  context.skip('bit_functions functions', function() {
    describe('BIT_COUNT', function() {
      it('example-1', runTestCase('./testcases/bit_functions/bit_count/1.txt'));
    });
  });
  context.skip('conversion_functions functions', function() {
    describe('CAST_AS_INTEGER', function() {
      it('example-1', runTestCase('./testcases/conversion_functions/cast_as_integer/1.txt'));
      it('example-2', runTestCase('./testcases/conversion_functions/cast_as_integer/2.txt'));
    });
    describe('CAST_AS_STRING', function() {
      it('example-1', runTestCase('./testcases/conversion_functions/cast_as_string/1.txt'));
      it('example-2', runTestCase('./testcases/conversion_functions/cast_as_string/2.txt'));
      it('example-3', runTestCase('./testcases/conversion_functions/cast_as_string/3.txt'));
      it('example-4', runTestCase('./testcases/conversion_functions/cast_as_string/4.txt'));
    });
    describe('CAST_AS_TIMESTAMP', function() {
      it('example-1', runTestCase('./testcases/conversion_functions/cast_as_timestamp/1.txt'));
    });
    describe('PARSE_BIGNUMERIC', function() {
      it('example-1', runTestCase('./testcases/conversion_functions/parse_bignumeric/1.txt'));
      it('example-2', runTestCase('./testcases/conversion_functions/parse_bignumeric/2.txt'));
      it('example-3', runTestCase('./testcases/conversion_functions/parse_bignumeric/3.txt'));
      it('example-4', runTestCase('./testcases/conversion_functions/parse_bignumeric/4.txt'));
      it('example-5', runTestCase('./testcases/conversion_functions/parse_bignumeric/5.txt'));
    });
    describe('PARSE_NUMERIC', function() {
      it('example-1', runTestCase('./testcases/conversion_functions/parse_numeric/1.txt'));
      it('example-2', runTestCase('./testcases/conversion_functions/parse_numeric/2.txt'));
      it('example-3', runTestCase('./testcases/conversion_functions/parse_numeric/3.txt'));
      it('example-4', runTestCase('./testcases/conversion_functions/parse_numeric/4.txt'));
      it('example-5', runTestCase('./testcases/conversion_functions/parse_numeric/5.txt'));
    });
    describe('SAFE_CASTING', function() {
      it('example-1', runTestCase('./testcases/conversion_functions/safe_casting/1.txt'));
    });
  });
  context.skip('formatting_syntax functions', function() {
    describe('FORMAT_BYTES_AS_STRING', function() {
      it('example-1', runTestCase('./testcases/formatting_syntax/format_bytes_as_string/1.txt'));
    });
    describe('FORMAT_STRING_AS_BYTES', function() {
      it('example-1', runTestCase('./testcases/formatting_syntax/format_string_as_bytes/1.txt'));
    });
    describe('FORMAT_DATE_TIME_AS_STRING', function() {
      it('example-1', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/1.txt'));
      it('example-2', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/2.txt'));
      it('example-3', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/3.txt'));
      it('example-4', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/4.txt'));
      it('example-5', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/5.txt'));
      it('example-6', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/6.txt'));
      it('example-7', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/7.txt'));
      it('example-8', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/8.txt'));
      it('example-9', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/9.txt'));
      it('example-10', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/10.txt'));
      it('example-11', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/11.txt'));
      it('example-12', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/12.txt'));
      it('example-13', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/13.txt'));
      it('example-14', runTestCase('./testcases/formatting_syntax/format_date_time_as_string/14.txt'));
    });
    describe('FORMAT_STRING_AS_DATETIME', function() {
      it('example-1', runTestCase('./testcases/formatting_syntax/format_string_as_datetime/1.txt'));
      it('example-2', runTestCase('./testcases/formatting_syntax/format_string_as_datetime/2.txt'));
      it('example-3', runTestCase('./testcases/formatting_syntax/format_string_as_datetime/3.txt'));
      it('example-4', runTestCase('./testcases/formatting_syntax/format_string_as_datetime/4.txt'));
      it('example-5', runTestCase('./testcases/formatting_syntax/format_string_as_datetime/5.txt'));
      it('example-6', runTestCase('./testcases/formatting_syntax/format_string_as_datetime/6.txt'));
      it('example-7', runTestCase('./testcases/formatting_syntax/format_string_as_datetime/7.txt'));
      it('example-8', runTestCase('./testcases/formatting_syntax/format_string_as_datetime/8.txt'));
    });
    describe('FORMAT_NUMERIC_TYPE_AS_STRING', function() {
      it('example-1', runTestCase('./testcases/formatting_syntax/format_numeric_type_as_string/1.txt'));
      it('example-2', runTestCase('./testcases/formatting_syntax/format_numeric_type_as_string/2.txt'));
      it('example-3', runTestCase('./testcases/formatting_syntax/format_numeric_type_as_string/3.txt'));
      it('example-4', runTestCase('./testcases/formatting_syntax/format_numeric_type_as_string/4.txt'));
      it('example-5', runTestCase('./testcases/formatting_syntax/format_numeric_type_as_string/5.txt'));
      it('example-6', runTestCase('./testcases/formatting_syntax/format_numeric_type_as_string/6.txt'));
      it('example-7', runTestCase('./testcases/formatting_syntax/format_numeric_type_as_string/7.txt'));
    });
  });
  context.skip('mathematical_functions functions', function() {
    describe('RANGE_BUCKET', function() {
      it('example-1', runTestCase('./testcases/mathematical_functions/range_bucket/1.txt'));
    });
  });
  context.skip('navigation_functions functions', function() {
    describe('FIRST_VALUE', function() {
      it('example-1', runTestCase('./testcases/navigation_functions/first_value/1.txt'));
    });
    describe('LAST_VALUE', function() {
      it('example-1', runTestCase('./testcases/navigation_functions/last_value/1.txt'));
    });
    describe('NTH_VALUE', function() {
      it('example-1', runTestCase('./testcases/navigation_functions/nth_value/1.txt'));
    });
    describe('LEAD', function() {
      it('example-1', runTestCase('./testcases/navigation_functions/lead/1.txt'));
      it('example-2', runTestCase('./testcases/navigation_functions/lead/2.txt'));
      it('example-3', runTestCase('./testcases/navigation_functions/lead/3.txt'));
    });
    describe('LAG', function() {
      it('example-1', runTestCase('./testcases/navigation_functions/lag/1.txt'));
      it('example-2', runTestCase('./testcases/navigation_functions/lag/2.txt'));
      it('example-3', runTestCase('./testcases/navigation_functions/lag/3.txt'));
    });
  });
  context.skip('hash_functions functions', function() {
    describe('FARM_FINGERPRINT', function() {
      it('example-1', runTestCase('./testcases/hash_functions/farm_fingerprint/1.txt'));
    });
    describe('MD5', function() {
      it('example-1', runTestCase('./testcases/hash_functions/md5/1.txt'));
    });
    describe('SHA1', function() {
      it('example-1', runTestCase('./testcases/hash_functions/sha1/1.txt'));
    });
  });
  context.skip('json_functions functions', function() {
    describe('JSON_EXTRACT', function() {
      it('example-1', runTestCase('./testcases/json_functions/json_extract/1.txt'));
      it('example-2', runTestCase('./testcases/json_functions/json_extract/2.txt'));
      it('example-3', runTestCase('./testcases/json_functions/json_extract/3.txt'));
      it('example-4', runTestCase('./testcases/json_functions/json_extract/4.txt'));
    });
    describe('JSON_QUERY', function() {
      it('example-1', runTestCase('./testcases/json_functions/json_query/1.txt'));
      it('example-2', runTestCase('./testcases/json_functions/json_query/2.txt'));
      it('example-3', runTestCase('./testcases/json_functions/json_query/3.txt'));
      it('example-4', runTestCase('./testcases/json_functions/json_query/4.txt'));
    });
    describe('JSON_EXTRACT_SCALAR', function() {
      it('example-1', runTestCase('./testcases/json_functions/json_extract_scalar/1.txt'));
      it('example-2', runTestCase('./testcases/json_functions/json_extract_scalar/2.txt'));
    });
    describe('JSON_VALUE', function() {
      it('example-1', runTestCase('./testcases/json_functions/json_value/1.txt'));
      it('example-2', runTestCase('./testcases/json_functions/json_value/2.txt'));
    });
    describe('JSON_EXTRACT_ARRAY', function() {
      it('example-1', runTestCase('./testcases/json_functions/json_extract_array/1.txt'));
      it('example-2', runTestCase('./testcases/json_functions/json_extract_array/2.txt'));
      it('example-3', runTestCase('./testcases/json_functions/json_extract_array/3.txt'));
      it('example-4', runTestCase('./testcases/json_functions/json_extract_array/4.txt'));
      it('example-5', runTestCase('./testcases/json_functions/json_extract_array/5.txt'));
      it('example-6', runTestCase('./testcases/json_functions/json_extract_array/6.txt'));
      it('example-7', runTestCase('./testcases/json_functions/json_extract_array/7.txt'));
    });
    describe('JSON_QUERY_ARRAY', function() {
      it('example-1', runTestCase('./testcases/json_functions/json_query_array/1.txt'));
      it('example-2', runTestCase('./testcases/json_functions/json_query_array/2.txt'));
      it('example-3', runTestCase('./testcases/json_functions/json_query_array/3.txt'));
      it('example-4', runTestCase('./testcases/json_functions/json_query_array/4.txt'));
      it('example-5', runTestCase('./testcases/json_functions/json_query_array/5.txt'));
      it('example-6', runTestCase('./testcases/json_functions/json_query_array/6.txt'));
      it('example-7', runTestCase('./testcases/json_functions/json_query_array/7.txt'));
    });
    describe('JSON_EXTRACT_STRING_ARRAY', function() {
      it('example-1', runTestCase('./testcases/json_functions/json_extract_string_array/1.txt'));
      it('example-2', runTestCase('./testcases/json_functions/json_extract_string_array/2.txt'));
      it('example-3', runTestCase('./testcases/json_functions/json_extract_string_array/3.txt'));
      it('example-4', runTestCase('./testcases/json_functions/json_extract_string_array/4.txt'));
      it('example-5', runTestCase('./testcases/json_functions/json_extract_string_array/5.txt'));
      it('example-6', runTestCase('./testcases/json_functions/json_extract_string_array/6.txt'));
    });
    describe('JSON_VALUE_ARRAY', function() {
      it('example-1', runTestCase('./testcases/json_functions/json_value_array/1.txt'));
      it('example-2', runTestCase('./testcases/json_functions/json_value_array/2.txt'));
      it('example-3', runTestCase('./testcases/json_functions/json_value_array/3.txt'));
      it('example-4', runTestCase('./testcases/json_functions/json_value_array/4.txt'));
      it('example-5', runTestCase('./testcases/json_functions/json_value_array/5.txt'));
      it('example-6', runTestCase('./testcases/json_functions/json_value_array/6.txt'));
    });
    describe('TO_JSON_STRING', function() {
      it('example-1', runTestCase('./testcases/json_functions/to_json_string/1.txt'));
      it('example-2', runTestCase('./testcases/json_functions/to_json_string/2.txt'));
    });
  });
  context.skip('datetime_functions functions', function() {
    describe('CURRENT_DATETIME', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/current_datetime/1.txt'));
      it('example-2', runTestCase('./testcases/datetime_functions/current_datetime/2.txt'));
    });
    describe('DATETIME', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/datetime/1.txt'));
    });
    describe('EXTRACT_2', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/extract_2/1.txt'));
      it('example-2', runTestCase('./testcases/datetime_functions/extract_2/2.txt'));
      it('example-3', runTestCase('./testcases/datetime_functions/extract_2/3.txt'));
    });
    describe('DATETIME_ADD', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/datetime_add/1.txt'));
    });
    describe('DATETIME_SUB', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/datetime_sub/1.txt'));
    });
    describe('DATETIME_DIFF', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/datetime_diff/1.txt'));
      it('example-2', runTestCase('./testcases/datetime_functions/datetime_diff/2.txt'));
      it('example-3', runTestCase('./testcases/datetime_functions/datetime_diff/3.txt'));
      it('example-4', runTestCase('./testcases/datetime_functions/datetime_diff/4.txt'));
    });
    describe('DATETIME_TRUNC', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/datetime_trunc/1.txt'));
      it('example-2', runTestCase('./testcases/datetime_functions/datetime_trunc/2.txt'));
      it('example-3', runTestCase('./testcases/datetime_functions/datetime_trunc/3.txt'));
    });
    describe('FORMAT_DATETIME', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/format_datetime/1.txt'));
      it('example-2', runTestCase('./testcases/datetime_functions/format_datetime/2.txt'));
      it('example-3', runTestCase('./testcases/datetime_functions/format_datetime/3.txt'));
    });
    describe('LAST_DAY_2', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/last_day_2/1.txt'));
      it('example-2', runTestCase('./testcases/datetime_functions/last_day_2/2.txt'));
      it('example-3', runTestCase('./testcases/datetime_functions/last_day_2/3.txt'));
      it('example-4', runTestCase('./testcases/datetime_functions/last_day_2/4.txt'));
      it('example-5', runTestCase('./testcases/datetime_functions/last_day_2/5.txt'));
    });
    describe('PARSE_DATETIME', function() {
      it('example-1', runTestCase('./testcases/datetime_functions/parse_datetime/1.txt'));
      it('example-2', runTestCase('./testcases/datetime_functions/parse_datetime/2.txt'));
      it('example-3', runTestCase('./testcases/datetime_functions/parse_datetime/3.txt'));
    });
  });
  context('timestamp_functions functions', function() {
    describe.skip('CURRENT_TIMESTAMP', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/current_timestamp/1.txt'));
      it('example-2', runTestCase('./testcases/timestamp_functions/current_timestamp/2.txt'));
    });
    describe.skip('EXTRACT_4', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/extract_4/1.txt'));
      it('example-2', runTestCase('./testcases/timestamp_functions/extract_4/2.txt'));
      it('example-3', runTestCase('./testcases/timestamp_functions/extract_4/3.txt'));
    });
    describe.skip('STRING', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/string/1.txt'));
    });
    describe('TIMESTAMP', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/timestamp/1.txt'));
      it('example-2', runTestCase('./testcases/timestamp_functions/timestamp/2.txt'));
      it('example-3', runTestCase('./testcases/timestamp_functions/timestamp/3.txt'));
      it('example-4', runTestCase('./testcases/timestamp_functions/timestamp/4.txt'));
      it('example-5', runTestCase('./testcases/timestamp_functions/timestamp/5.txt'));
    });
    describe.skip('TIMESTAMP_ADD', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/timestamp_add/1.txt'));
    });
    describe.skip('TIMESTAMP_SUB', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/timestamp_sub/1.txt'));
    });
    describe.skip('TIMESTAMP_DIFF', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/timestamp_diff/1.txt'));
      it('example-2', runTestCase('./testcases/timestamp_functions/timestamp_diff/2.txt'));
      it('example-3', runTestCase('./testcases/timestamp_functions/timestamp_diff/3.txt'));
    });
    describe.skip('TIMESTAMP_TRUNC', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/timestamp_trunc/1.txt'));
      it('example-2', runTestCase('./testcases/timestamp_functions/timestamp_trunc/2.txt'));
      it('example-3', runTestCase('./testcases/timestamp_functions/timestamp_trunc/3.txt'));
    });
    describe.skip('FORMAT_TIMESTAMP', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/format_timestamp/1.txt'));
      it('example-2', runTestCase('./testcases/timestamp_functions/format_timestamp/2.txt'));
      it('example-3', runTestCase('./testcases/timestamp_functions/format_timestamp/3.txt'));
    });
    describe.skip('PARSE_TIMESTAMP', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/parse_timestamp/1.txt'));
    });
    describe.skip('TIMESTAMP_SECONDS', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/timestamp_seconds/1.txt'));
    });
    describe.skip('TIMESTAMP_MILLIS', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/timestamp_millis/1.txt'));
    });
    describe.skip('TIMESTAMP_MICROS', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/timestamp_micros/1.txt'));
    });
    describe.skip('UNIX_SECONDS', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/unix_seconds/1.txt'));
    });
    describe.skip('UNIX_MILLIS', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/unix_millis/1.txt'));
    });
    describe.skip('UNIX_MICROS', function() {
      it('example-1', runTestCase('./testcases/timestamp_functions/unix_micros/1.txt'));
    });
  });
  context.skip('operators functions', function() {
    describe('DATE_ARITHMETICS_OPERATORS', function() {
      it('example-1', runTestCase('./testcases/operators/date_arithmetics_operators/1.txt'));
    });
    describe('LOGICAL_OPERATORS', function() {
      it('example-1', runTestCase('./testcases/operators/logical_operators/1.txt'));
      it('example-2', runTestCase('./testcases/operators/logical_operators/2.txt'));
      it('example-3', runTestCase('./testcases/operators/logical_operators/3.txt'));
      it('example-4', runTestCase('./testcases/operators/logical_operators/4.txt'));
    });
  });
  context.skip('approximate_aggregate_functions functions', function() {
    describe('APPROX_COUNT_DISTINCT', function() {
      it('example-1', runTestCase('./testcases/approximate_aggregate_functions/approx_count_distinct/1.txt'));
    });
    describe('APPROX_QUANTILES', function() {
      it('example-1', runTestCase('./testcases/approximate_aggregate_functions/approx_quantiles/1.txt'));
      it('example-2', runTestCase('./testcases/approximate_aggregate_functions/approx_quantiles/2.txt'));
      it('example-3', runTestCase('./testcases/approximate_aggregate_functions/approx_quantiles/3.txt'));
      it('example-4', runTestCase('./testcases/approximate_aggregate_functions/approx_quantiles/4.txt'));
      it('example-5', runTestCase('./testcases/approximate_aggregate_functions/approx_quantiles/5.txt'));
    });
    describe('APPROX_TOP_COUNT', function() {
      it('example-1', runTestCase('./testcases/approximate_aggregate_functions/approx_top_count/1.txt'));
      it('example-2', runTestCase('./testcases/approximate_aggregate_functions/approx_top_count/2.txt'));
    });
    describe('APPROX_TOP_SUM', function() {
      it('example-1', runTestCase('./testcases/approximate_aggregate_functions/approx_top_sum/1.txt'));
      it('example-2', runTestCase('./testcases/approximate_aggregate_functions/approx_top_sum/2.txt'));
      it('example-3', runTestCase('./testcases/approximate_aggregate_functions/approx_top_sum/3.txt'));
      it('example-4', runTestCase('./testcases/approximate_aggregate_functions/approx_top_sum/4.txt'));
    });
  });
  context.skip('hyperloglog_functions functions', function() {
    describe('HLL_COUNTEXTRACT', function() {
      it('example-1', runTestCase('./testcases/hyperloglog_functions/hll_countextract/1.txt'));
    });
  });
  context.skip('geography_functions functions', function() {
    describe('ST_CENTROID_AGG', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_centroid_agg/1.txt'));
    });
    describe('ST_CLUSTERDBSCAN', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_clusterdbscan/1.txt'));
    });
    describe('ST_CONTAINS', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_contains/1.txt'));
    });
    describe('ST_CONVEXHULL', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_convexhull/1.txt'));
    });
    describe('ST_COVERS', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_covers/1.txt'));
    });
    describe('ST_DUMP', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_dump/1.txt'));
      it('example-2', runTestCase('./testcases/geography_functions/st_dump/2.txt'));
    });
    describe('ST_ENDPOINT', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_endpoint/1.txt'));
    });
    describe('ST_GEOGFROM', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_geogfrom/1.txt'));
      it('example-2', runTestCase('./testcases/geography_functions/st_geogfrom/2.txt'));
      it('example-3', runTestCase('./testcases/geography_functions/st_geogfrom/3.txt'));
      it('example-4', runTestCase('./testcases/geography_functions/st_geogfrom/4.txt'));
    });
    describe('ST_GEOGFROMTEXT', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_geogfromtext/1.txt'));
      it('example-2', runTestCase('./testcases/geography_functions/st_geogfromtext/2.txt'));
      it('example-3', runTestCase('./testcases/geography_functions/st_geogfromtext/3.txt'));
    });
    describe('ST_GEOHASH', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_geohash/1.txt'));
    });
    describe('ST_INTERSECTSBOX', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_intersectsbox/1.txt'));
    });
    describe('ST_POINTN', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_pointn/1.txt'));
    });
    describe('ST_SIMPLIFY', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_simplify/1.txt'));
      it('example-2', runTestCase('./testcases/geography_functions/st_simplify/2.txt'));
    });
    describe('ST_STARTPOINT', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_startpoint/1.txt'));
    });
    describe('ST_X', function() {
      it('example-1', runTestCase('./testcases/geography_functions/st_x/1.txt'));
    });
  });
  context.skip('security_functions functions', function() {
    describe('SESSION_USER', function() {
      it('example-1', runTestCase('./testcases/security_functions/session_user/1.txt'));
    });
  });
});
