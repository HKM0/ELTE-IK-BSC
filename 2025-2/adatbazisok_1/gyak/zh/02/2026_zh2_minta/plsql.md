# Minta_2ZH_2resz_PLSQL - Hajas Csilla

```sql
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



-- 3.feladat (7 pont) CREATE OR REPLACE PROCEDURE
/*
(6 pont) Készítsen egy PENZUGYI_KORREKCIO nevű eljárást, amely a veszteséges filmeket kezeli.
Feladat: Keressen meg minden olyan filmet, ahol a Költség magasabb, mint a Bevétel.
Használjon explicit módosítható kurzort FOR UPDATE (!)
A kurzoron belül haladva minden ilyen filmnél állítsa be a Bevétel értékét pontosan a Költség értékére (tehát "nullszaldóssá" teszi a filmet a könyvelésben). 
(1 pont) Kezelje le a hibákat, ha a sorok éppen zárolva lennének vagy egyéb hiba fordulna elő.
*/


create or replace procedure penzugyi_korrekcio
is
cursor c1 is
select * from filmek
where nvl(költség, 0) > nvl(bevétel, 0)
for update of bevétel NOWAIT;

v_film filmek%rowtype;
begin
    open c1;
    
    loop
        fetch c1 into v_film;
        exit when c1%notfound;
        
        update filmek
        set bevétel = nvl(költség, 0)
        where current of c1;
    end loop;
    
    close c1;
exception when others then dbms_output.put_line('Hiba történt');
end;
/


```