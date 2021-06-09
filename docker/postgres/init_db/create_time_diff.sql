-- Original source from http://www.sqlines.com/postgresql/how-to/datediff#postgresql-datediff-user-defined-function-udf

CREATE OR REPLACE FUNCTION TIME_DIFF (units VARCHAR(30), start_t TIME, end_t TIME)
    RETURNS INT AS $$
DECLARE
    diff_interval INTERVAL;
    diff INT = 0;
    temp TIME;
BEGIN
    IF start_t > end_t THEN
        temp = start_t;
        start_t = end_t;
        end_t = temp;
    END IF;

    units = lower(units);

    diff_interval = end_t - start_t;

    diff = diff * 24 + DATE_PART('hour', diff_interval);

    IF units = 'hour' THEN
        RETURN diff;
    END IF;

    diff = diff * 60 + DATE_PART('minute', diff_interval);

    IF units = 'minute' THEN
        RETURN diff;
    END IF;

    diff = diff * 60 + DATE_PART('second', diff_interval);
    IF units = 'second' THEN
        RETURN diff;
    END IF;

    diff = diff * 60 + DATE_PART('millisecond', diff_interval);
    IF units = 'millisecond' THEN
        RETURN diff;
    END IF;

    diff = diff * 1000 + DATE_PART('microsecond', diff_interval);

    RETURN diff;
END;
$$ LANGUAGE plpgsql;
