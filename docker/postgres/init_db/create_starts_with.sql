CREATE OR REPLACE FUNCTION STARTS_WITH(value1 TEXT, value2 TEXT)
    RETURNS BOOLEAN AS
$$
DECLARE
BEGIN
    RETURN value1 LIKE value2||'%';
END;
$$ LANGUAGE plpgsql;
