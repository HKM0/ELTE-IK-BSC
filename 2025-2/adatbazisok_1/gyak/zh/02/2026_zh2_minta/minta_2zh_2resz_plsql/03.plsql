set serveroutput on;

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