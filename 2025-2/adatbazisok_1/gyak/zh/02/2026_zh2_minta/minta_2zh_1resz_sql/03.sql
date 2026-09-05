-- 3.feladat (5 pont) SQL CREATE TABLE
/*
Készítsünk el SQL-ben két táblát: sportcsapatok és jatekosok.  
Az egyik tábla a sportcsapatok: csapatnev, varos, tagdij oszlopokkal, 
ebben a táblában legyen összetett kulcs (csapatnev, varos), 
és ha a varos nem 'Budapest', akkor a tagdíj <= 5000 legyen! 
A másik tábla, a jatekosok táblának az attribútumai legyenek: 
nev, mezszam, szuldatum, szulvaros, csapatnev, varos
és itt is legyen összetett kulcs (mezszam, csapatnev, varos),  
a játékosok táblában a (csapatnev, varos) legyen idegen kulcs, vagyis itt hivatkozunk a sportcsapatok tábla elsődleges kulcsára, 
a nev oszlopot kötelező kitölteni és egyedinek kell lennie! 
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