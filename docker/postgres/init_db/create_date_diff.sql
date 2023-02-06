-- Original source from http://www.sqlines.com/postgresql/how-to/datediff#postgresql-datediff-user-defined-function-udf

CREATE OR REPLACE FUNCTION DATE_DIFF (units VARCHAR(30), start_t TIMESTAMP, end_t TIMESTAMP)
    RETURNS INT AS $$
DECLARE
    diff_interval INTERVAL;
    diff INT = 0;
    temp TIMESTAMP;
BEGIN
    IF start_t > end_t THEN
        temp = start_t;
        start_t = end_t;
        end_t = temp;
    END IF;

    units = lower(units);

    IF units = 'isoyear' THEN
        RETURN DATE_PART('ISOYEAR', end_t) - DATE_PART('ISOYEAR', start_t);
    END IF;

    diff = DATE_PART('year', end_t) - DATE_PART('year', start_t);
    IF units = 'year' THEN
        RETURN diff;
    END IF;

    diff = diff * 12 + (DATE_PART('month', end_t) - DATE_PART('month', start_t));
    IF units = 'month' THEN
        RETURN diff;
    END IF;

    diff_interval = end_t - start_t;
    diff = DATE_PART('day', diff_interval);

    IF units = 'week' THEN
        diff = CEIL(diff::FLOAT/7);
        RETURN diff;
    END IF;

    IF units = 'day' THEN
        RETURN diff;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
