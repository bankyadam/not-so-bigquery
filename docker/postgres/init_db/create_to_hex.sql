CREATE OR REPLACE FUNCTION TO_HEX(bytes ANYELEMENT)
    RETURNS TEXT AS
$$
DECLARE
BEGIN
    RETURN encode(bytes, 'hex');
END;
$$ LANGUAGE plpgsql;
