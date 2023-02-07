CREATE OR REPLACE FUNCTION FROM_BASE64(string_expr TEXT)
    RETURNS bytea AS
$$
DECLARE
BEGIN
    RETURN decode(string_expr, 'base64');
END;
$$ LANGUAGE plpgsql;
