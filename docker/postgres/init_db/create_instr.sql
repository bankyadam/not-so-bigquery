CREATE OR REPLACE FUNCTION INSTR("source_value" TEXT, "search_value" TEXT, "position" INTEGER, "occurrence" INTEGER)
    RETURNS INT AS
$$
DECLARE
    current_position  INT;
    result            INT;
    temp_source_value TEXT;
BEGIN
    IF source_value IS NULL OR search_value IS NULL OR position IS NULL OR occurrence IS NULL THEN
        RETURN NULL;
    END IF;

    IF LENGTH(source_value) < position THEN
        RETURN 0;
    END IF;

    IF position = 0 THEN
        RAISE EXCEPTION 'position can not be 0';
    END IF;

    IF occurrence < 1 THEN
        RAISE EXCEPTION 'occurrence must be 1 or greater';
    END IF;

    temp_source_value = source_value;
    IF position > 1 THEN
        temp_source_value = SUBSTR(source_value, position);
    END IF;

    current_position = STRPOS(temp_source_value, search_value);
    result = current_position;

    IF result > 0 THEN
        IF occurrence > 1 THEN
            RAISE NOTICE '%. temp source value: %', occurrence, temp_source_value;
            RAISE NOTICE '%. current_position: %', occurrence, current_position;
            RAISE NOTICE '%. result: %', occurrence, result;

            WHILE occurrence - 1 > 0
                LOOP
                    temp_source_value = SUBSTR(temp_source_value, current_position + 1);
                    current_position = STRPOS(temp_source_value, search_value);
                    IF current_position = 0 THEN
                        RETURN 0;
                    END IF;

                    result = result + current_position;
                    occurrence = occurrence - 1;

                    RAISE NOTICE '%. temp source value: %', occurrence, temp_source_value;
                    RAISE NOTICE '%. current_position: %', occurrence, current_position;
                    RAISE NOTICE '%. result: %', occurrence, result;
                END LOOP;
        END IF;

        IF position > 1 THEN
            result = result + position - 1;
        END IF;

        RETURN result;
    END IF;

    RETURN 0;
END;
$$ LANGUAGE plpgsql;
