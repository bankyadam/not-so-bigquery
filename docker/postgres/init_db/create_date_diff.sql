-- Original source from http://www.sqlines.com/postgresql/how-to/datediff#postgresql-datediff-user-defined-function-udf

CREATE OR REPLACE FUNCTION DATE_DIFF (units VARCHAR(30), start_t TIMESTAMP, end_t TIMESTAMP)
    RETURNS INT AS $$
DECLARE
    diff_interval INTERVAL;
    diff INT = 0;
    years_diff INT = 0;
    temp TIMESTAMP;
BEGIN
    IF start_t > end_t THEN
        temp = start_t;
        start_t = end_t;
        end_t = temp;
    END IF;

    units = lower(units);

    IF units IN ('year', 'month') THEN
        years_diff = DATE_PART('year', end_t) - DATE_PART('year', start_t);

        IF units = 'year' THEN
            RETURN years_diff;
        ELSE
            RETURN years_diff * 12 + (DATE_PART('month', end_t) - DATE_PART('month', start_t));
        END IF;
    END IF;

    diff_interval = end_t - start_t;

    diff = diff + DATE_PART('day', diff_interval);

    IF units = 'week' THEN
        diff = diff/7;
        RETURN diff;
    END IF;

    IF units = 'day' THEN
        RETURN diff;
    END IF;

    diff = diff * 24 + DATE_PART('hour', diff_interval);

    IF units = 'hour' THEN
        RETURN diff;
    END IF;

    diff = diff * 60 + DATE_PART('minute', diff_interval);

    IF units = 'minute' THEN
        RETURN diff;
    END IF;

    diff = diff * 60 + DATE_PART('second', diff_interval);

    RETURN diff;
END;
$$ LANGUAGE plpgsql;
