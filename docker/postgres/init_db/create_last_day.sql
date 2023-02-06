CREATE OR REPLACE FUNCTION LAST_DAY (date_expression DATE, date_part VARCHAR(30) DEFAULT 'month')
    RETURNS DATE AS $$
DECLARE
BEGIN
    date_part = LOWER(date_part);
    IF date_part = 'year' OR date_part = 'isoyear' THEN
        RETURN date_trunc('year', date_expression + INTERVAL '1 year') - INTERVAL '1 day';
    END IF;

    IF date_part = 'month' THEN
        RETURN date_trunc('month', date_expression + INTERVAL '1 month') - INTERVAL '1 day';
    END IF;

    IF date_part = 'week' THEN
        RETURN date_trunc('week', date_expression + INTERVAL '1 week') - INTERVAL '1 day';
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
