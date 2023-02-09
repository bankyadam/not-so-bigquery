CREATE OR REPLACE FUNCTION REVERSE(bytes BYTEA)
    RETURNS TEXT AS
$$
BEGIN
   RETURN REVERSE(convert_from(bytes, 'UTF8'));
END;
$$ LANGUAGE plpgsql;