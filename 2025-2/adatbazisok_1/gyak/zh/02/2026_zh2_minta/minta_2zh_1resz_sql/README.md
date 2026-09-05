# minta_2zh_1resz_sql_megoldas
### _Hajas Csilla Dóra Dr._ feladatsoraiból


```sql

-- 1.feladat (5 pont) SQL DELETE  -  Törölje azokat a rendezőket a Rendezok táblából, akikhez nem tartozik egyetlen film sem a Filmek táblában.

--select * from rendezok;

delete from rendezok
where nev not in (select RENDEZŐNÉV from filmek);

--select * from rendezok;
rollback;


-- 2.feladat (5 pont) SQL UPDATE  -  Frissítse a Filmek táblát! Az összes 'USA' országhoz tartozó film Bevétel értékét növelje meg 15%-kal, de csak azoknál a filmeknél, ahol a Költség meghaladja a 10 millió egységet. Ahol a bevétel eredetileg NULL volt, ott maradjon továbbra is NULL.

--select bevétel from filmek;

update filmek
set filmek.bevétel = filmek.bevétel * 1.15
where filmek.költség >= 10000000 and filmek.bevétel is not null;

--select bevétel from filmek;
rollback;


-- 3.feladat (5 pont) SQL CREATE TABLE
/*
Készítsünk el SQL-ben két táblát: sportcsapatok és jatekosok.  
Az egyik tábla a sportcsapatok: csapatnev, varos, tagdij oszlopokkal, 
ebben a táblában legyen összetett kulcs (csapatnev, varos), 
és ha a varos nem 'Budapest', akkor a tagdíj <= 5000 legyen! 
A másik tábla, a jatekosok táblának az attribútumai legyenek: 
nev, mezszam, szuldatum, szulvaros, csapatnev, varos
és itt is legyen összetett kulcs (mezszam, csapatnev, varos),  
a játékosok táblában a (csapatnev, varos) legyen idegen kulcs, vagyis itt hivatkozunk a sportcsapatok tábla elsődleges kulcsára, a nev oszlopot kötelező kitölteni és egyedinek kell lennie! 
Küldje be az SQL utasításokból  álló szkriptet 
DROP TABLE JATEKOSOK; 
DROP TABLE SPORTCSAPATOK; 
CREATE TABLE ... ; -- ezt kell megírnia és beküldenie a két tábla létrehozására
*/

DROP TABLE jatekosok cascade constraints; 
DROP TABLE sportcsapatok cascade constraints; 

create table sportcsapatok(
    csapatnev varchar(20), 
    varos varchar(20), 
    tagdij number 
);
    
alter table sportcsapatok 
    add constraint sportcsapatok_primkey primary key (csapatnev, varos)
    add constraint sportcsapatoktagdij_check check (varos = 'Budapest' or tagdij <= 5000);

create table jatekosok(
    nev varchar(20), 
    mezszam number, 
    szuldatum date, 
    szulvaros varchar(20), 
    csapatnev varchar(20), 
    varos varchar(20)
);

alter table jatekosok
    add constraint jatekosok_primkey primary key (mezszam, csapatnev, varos)
    add constraint jatekosok_forkey foreign key (csapatnev, varos) references sportcsapatok(csapatnev, varos)
    add constraint jetakosnev_check check (nev is not null)
    add constraint jatekosnev_unique unique (nev);

rollback;


-- 4.feladat (5 pont) SQL Hierarchikus lekérdezés CONNECT BY 
/*
Hozza létre az alábbi utasításokkal a Jaratok táblát táblában (ahol most nincs kör, fa-szerkezetű) és 
ebben hierarchikus lekérdezéssel adjuk meg mely 
Honnan (mely városból), 
Hova (mely városba), 
hány átszállással és milyen költséggel lehetséges egy vagy több átszállással eljutni, ha 'SF'-ből indulunk? */


/*

// ez a probalkozas hibas volt

select honnan, hova, level + 1 atszallas, (nvl(prior koltseg, 0) + nvl(koltseg, 0)) ar from jaratok
where honnan = 'SF' and level >= 1
connect by prior hova = honnan;
--order by hova desc;
*/

SELECT CONNECT_BY_ROOT honnan honnan, hova, LEVEL - 1 atszallas,
    XMLCAST(XMLQUERY(LTRIM(SYS_CONNECT_BY_PATH(koltseg, '+'), '+') RETURNING CONTENT) AS NUMBER) ar
    FROM jaratok
    START WITH honnan = 'SF'
    CONNECT BY PRIOR hova = honnan;
    
    
rollback;



```

























