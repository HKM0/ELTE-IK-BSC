set serveroutput on;

-- 1.feladat (6 pont)  CREATE OR REPLACE FUNCTION
/*
(4 pont) Készítsen egy GET_PROFIT_RATIO nevű függvényt! 
Bemenet: p_cim, p_ev.
Logika: Számítsa ki a (Bevétel / Költség) arányt.
Visszatérési érték: A kiszámított arány (szám).
(2 pont) Hibakezelés: Ha a Költség 0 vagy NULL, 
dobjon egy saját kivételt (e_zero_divide_error) és térjen vissza 0-val. 
Ha a film nem található, kezelje a NO_DATA_FOUND kivételt
*/


CREATE OR REPLACE FUNCTION GET_PROFIT_RATIO (p_cim varchar2, p_ev number) return number 
IS
    e_zero_divide_error exception;
    sor filmek%rowtype;

BEGIN
    select * into sor from filmek 
    where cim = p_cim and ev = p_ev;
    IF sor.költség is null or sor.költség = 0 then raise e_zero_divide_error;
    ELSE return sor.bevétel / sor.költség;
    END IF;
    
EXCEPTION
    when NO_DATA_FOUND then DBMS_OUTPUT.put_line('hatalmas hiszti nincs adat');
    when e_zero_divide_error then return 0;

END;
/

rollback;

