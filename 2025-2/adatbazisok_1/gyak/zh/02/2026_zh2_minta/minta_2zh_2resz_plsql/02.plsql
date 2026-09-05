set serveroutput on;

-- 2.feladat (7 pont) CREATE OR REPLACE PROCEDURE
/*
(7 pont) Írjon egy LISTAZ_ORSZAG_FILMEI nevű tárolt eljárást!
Paraméter: p_orszag (VARCHAR2).
Feladat: Explicit kurzor(!) segítségével listázza ki az adott országhoz tartozó összes film címét, évét és a rendező nevét. 
A listázás végén az eljárás írja ki, összesen hány filmet talált. Rendezze az eredményt a filmek éve szerint csökkenő sorrendbe.
*/


CREATE OR REPLACE PROCEDURE LISTAZ_ORSZAG_FILMEI (p_orszag IN VARCHAR2) 
IS
    CURSOR c_filmek IS 
        SELECT cim, ev, rendezőnév 
        FROM filmek 
        WHERE orszag = p_orszag 
        ORDER BY ev DESC;
        
    v_rekord c_filmek%ROWTYPE;
    v_szamlalo NUMBER := 0;
BEGIN
    OPEN c_filmek;
    
    LOOP
        FETCH c_filmek INTO v_rekord;
        EXIT WHEN c_filmek%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE(v_rekord.cim || ' ' || v_rekord.ev || ' ' || v_rekord.rendezőnév);
        
        v_szamlalo := v_szamlalo + 1;
    END LOOP;
    
    CLOSE c_filmek;
    
    DBMS_OUTPUT.PUT_LINE('talált filmek száma: ' || v_szamlalo);
END;
/

EXECUTE LISTAZ_ORSZAG_FILMEI('USA');

rollback;
