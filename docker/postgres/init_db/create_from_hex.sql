CREATE OR REPLACE FUNCTION FROM_HEX(string_expr TEXT)
    RETURNS bytea AS
$$
BEGIN
    IF LENGTH(string_expr) % 2 = 1 THEN
        string_expr = '0'||string_expr;
    END IF;

    RETURN decode(string_expr, 'hex');
END;
$$ LANGUAGE plpgsql;
