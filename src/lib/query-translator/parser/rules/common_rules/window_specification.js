'use strict';

/* eslint-disable new-cap */
const TOKENS = require('../../../tokens');

/**
 * OVER ( window_definition )
 *
 * window_specification:
 *   [ named_window ]
 *   [ PARTITION BY partition_expression [, ...] ]
 *   [ ORDER BY expression [ { ASC | DESC } ] [, ...] ]
 *   [ window_frame_clause ]
 */
module.exports = ($) => {
  $.RULE('windowSpecification', () => {
    $.CONSUME(TOKENS.Over);
    $.CONSUME(TOKENS.LeftParenthesis);
    $.OPTION1(() => { $.SUBRULE($.partitionBy); });
    $.OPTION2(() => { $.SUBRULE($.orderByClause); });
    $.OPTION3(() => { $.SUBRULE($.frameClause); });
    $.CONSUME(TOKENS.RightParenthesis);
  });

  $.RULE('partitionBy', () => {
    $.CONSUME(TOKENS.PartitionBy);
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => $.SUBRULE($.atomicExpression)
    });
  });

  $.RULE('frameClause', () => {
    $.CONSUME(TOKENS.RowsRange);
    $.OR({
      IGNORE_AMBIGUITIES: true,
      DEF: [
        { ALT: () => $.SUBRULE($.frame) },
        { ALT: () => $.SUBRULE($.frameBetween) }
      ]
    });
  });

  $.RULE('frameBetween', () => {
    $.CONSUME(TOKENS.Between);
    $.SUBRULE1($.frame, { LABEL: 'frameBegin' });
    $.CONSUME(TOKENS.And);
    $.SUBRULE2($.frame, { LABEL: 'frameEnd' });
  });

  $.RULE('frame', () => {
    $.OR({
      DEF: [
        { ALT: () => $.SUBRULE($.numericPreceding) },
        { ALT: () => $.SUBRULE($.unboundedPreceding) },
        { ALT: () => $.CONSUME(TOKENS.CurrentRow) },
        { ALT: () => $.SUBRULE($.numericFollowing) },
        { ALT: () => $.SUBRULE($.unboundedFollowing) }
      ]
    });
  });

  $.RULE('unboundedPreceding', () => {
    $.CONSUME(TOKENS.Unbounded);
    $.CONSUME(TOKENS.Preceding);
  });

  $.RULE('numericPreceding', () => {
    $.CONSUME(TOKENS.Numeric);
    $.CONSUME(TOKENS.Preceding);
  });

  $.RULE('unboundedFollowing', () => {
    $.CONSUME(TOKENS.Unbounded);
    $.CONSUME(TOKENS.Following);
  });

  $.RULE('numericFollowing', () => {
    $.CONSUME(TOKENS.Numeric);
    $.CONSUME(TOKENS.Following);
  });
};

