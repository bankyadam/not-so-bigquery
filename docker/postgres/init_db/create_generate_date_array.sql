CREATE OR REPLACE FUNCTION GENERATE_DATE_ARRAY(start_date DATE, end_date DATE,
                                               "interval" INTERVAL DEFAULT '1 DAY'::INTERVAL)
    RETURNS DATE[] AS
$$
DECLARE
    retval                  DATE[];
    current_date_in_process DATE;
BEGIN
    IF start_date IS NULL OR end_date IS NULL THEN
        RETURN NULL;
    END IF;

    --     IF interval = 0::interval THEN
--         RAISE SYNTAX_ERROR USING MESSAGE = '"date_part" can not be 0.';
--     END IF;

    IF interval <= '1 seconds'::INTERVAL AND start_date < end_date THEN
        RETURN ARRAY[]::date[];
    END IF;

    IF interval >= '-1 seconds'::INTERVAL AND start_date > end_date THEN
        RETURN ARRAY[]::date[];
    END IF;

    IF start_date = end_date THEN
        RETURN ARRAY [start_date];
    END IF;

    current_date_in_process = start_date;

    LOOP
        retval = ARRAY_APPEND(retval, current_date_in_process);
        EXIT WHEN (interval >= '1 seconds'::INTERVAL AND current_date_in_process+interval > end_date) OR
                  (interval <= '-1 seconds'::INTERVAL AND current_date_in_process+interval < end_date);
        current_date_in_process = current_date_in_process + interval;
    END LOOP;

    RETURN retval;
END;
$$ LANGUAGE plpgsql;
