DROP FUNCTION IF EXISTS IEEE_DIVIDE;
CREATE OR REPLACE FUNCTION IEEE_DIVIDE(x FLOAT8, y FLOAT8)
    RETURNS FLOAT8 AS
$$
DECLARE
BEGIN
    IF x = FLOAT8 'NaN' OR y = FLOAT8 'NaN' THEN
        RETURN FLOAT8 'NaN';
    END IF;

    IF y = 0 THEN
        IF x > 0 THEN
            RETURN FLOAT8 '+Infinity';
        ELSIF x < 0 THEN
            RETURN FLOAT8 '-Infinity';
        ELSE
            RETURN FLOAT8 'NaN';
        END IF;
    END IF;

    IF x = FLOAT8 '+infinity' AND y = FLOAT8 '+infinity' THEN
        RETURN FLOAT8 'NaN';
    END IF;

    IF x = FLOAT8 '-infinity' AND y = FLOAT8 '-infinity' THEN
        RETURN FLOAT8 'NaN';
    END IF;

    RETURN x / y;
END;
$$ LANGUAGE plpgsql;
