Minta 1.ZH / 2.rész Gépes feladatok Oracle SQL-ben

4 feladat x 5 pont = 20 pont, min.követelmény: 8 pont (40%)
Fejezzük ki a következő lekérdezéseket Oracle SQL-ben

Előkészítés - Hozzuk létre a táblákat az alábbi scripttel:  
drop table got_hazak;
drop table got_karakterek;
drop table got_csatak;

create table got_hazak (
haz_nev varchar2(20) PRIMARY KEY,
motto varchar2(200)
);

create table got_karakterek (
nev varchar2(20) PRIMARY KEY,
vagyon number,
haz_nev varchar2(20),
sereg number
);

create table got_csatak (
haz_nev varchar2(20),
csata_nev varchar2(20),
gyozott varchar2(10),
CONSTRAINT pk_got_csatak PRIMARY KEY (haz_nev, csata_nev)
);

insert into got_csatak values('Stark', 'Fattyak csatája', 'igen');
insert into got_csatak values('Bolton', 'Fattyak csatája', 'nem');
insert into got_csatak values('Arryn', 'Fattyak csatája', 'igen');
insert into got_csatak values('Frey', 'Vörös nász', 'igen');
insert into got_csatak values('Stark', 'Vörös nász', 'nem');
insert into got_csatak values('Stark', 'Trident-i csata','igen');
insert into got_csatak values('Baratheon', 'Trident-i csata','igen');
insert into got_csatak values('Targaryen', 'Trident-i csata','nem');
insert into got_csatak values('Stark', 'Harangok csatája','igen');
insert into got_csatak values('Baratheon', 'Harangok csatája','igen');
insert into got_csatak values('Targaryen', 'Harangok csatája','nem');

insert into got_hazak values('Targaryen', 'Tűz és vér');
insert into got_hazak values('Baratheon','Miénk a harag');
insert into got_hazak values('Stark','Közeleg a tél');
insert into got_hazak values('Lannister','Halld üvöltésem');
insert into got_hazak values('Grejyoy','Mi nem vetünk');
insert into got_hazak values('Tully','Család, kötelesség, becsület');
insert into got_hazak values('Martell','Meg nem hajol, meg nem rogy, meg nem törik');
insert into got_hazak values('Tyrell', 'Erőssé növünk');
insert into got_hazak values('Bolton', 'Pengéink élesek');
insert into got_hazak values('Arryn', 'Hatalmas, mint a becsület');

insert into got_karakterek values('Eddard Stark', 2000, 'Stark', 1000);
insert into got_karakterek values('Robb Stark', 7000, 'Stark', 5000);
insert into got_karakterek values('Catelyn Stark',1500,'Stark',200);
insert into got_karakterek values('Robert Baratheon',4000,'Baratheon',4000);
insert into got_karakterek values('Stannis Baratheon',6000,'Baratheon',4000);
insert into got_karakterek values('Jaime Lannister',5000,'Lannister',null);
insert into got_karakterek values('Tywin Lannister', 150000, 'Lannister', 6000);
insert into got_karakterek values('Tyrion Lannister', 2000, 'Lannister', 0);
insert into got_karakterek values('Cersei Lannister',5000,'Lannister',5000);
insert into got_karakterek values('Viserys Targaryen', 200, 'Targaryen', null);
insert into got_karakterek values('Daenerys Targaryen',6000,'Targaryen',7000);
insert into got_karakterek values('Theon Greyjoy',null,'Greyjoy',3000);
insert into got_karakterek values('Edmure Tully',3000,'Tully',null);
insert into got_karakterek values('Oberyn Martell', null, 'Martell', 0);

COMMIT;

select * from got_karakterek;
select * from got_hazak;
select * from got_csatak;

Feladatok:

1.feladat (5 pont)
Melyik háznak van legalább két olyan karaktere, akik képesek a vagyonukból fenntartani a seregüket (egy katona élelmezése 15 arany)?
(Ház_név)
```sql
select haz_nev from got_karakterek where vagyon >= sereg*15 group by haz_nev having count(*) >=2;
```

2.feladat (5 pont)
Add meg a 20000-nél nagyobb összvagyonnal rendelkező házak a teljes seregének erejét! Ahol a sereg mérete ismeretlen 1000-rel számolj!
(ház_név, teljes_sereg)
```sql
select haz_nev 
from (select haz_nev,sum(vagyon) as vagyon, sum(NVL(sereg,1000)) as sereg 
from got_karakterek 
group by haz_nev) 
where vagyon >20000;

-- vagy így is lehet
select haz_nev, sum(NVL(sereg, 1000)) as ossz_sereg 
from got_karakterek 
group by haz_nev
having sum(vagyon) > 20000 ;
```

3.feladat (5 pont)
Add meg az egyes házak legnagyobb sereggel rendelkező karakterét (egyenlőség esetén karaktereit).
(ház_név, sereg, karakter)
```sql
select haz_nev, nev, sereg as karakter 
from got_karakterek
where (haz_nev, sereg) 
in (select haz_nev, max(sereg) 
    from got_karakterek 
    group by haz_nev)
```

4.feladat (5 pont)
Add meg mi a mottója annak a háznak/házaknak amelyik elveszítette a legtöbb szereplős (legtöbb ház között zajló) csatát!
(mottó)
```sql
select h.motto 
from got_hazak h
join got_csatak c on c.haz_nev = h.haz_nev
where c.gyozott='nem' and c.csata_nev in 
    (select csata_nev 
    from got_csatak
    group by csata_nev
    having count(haz_nev) = (select max(count(haz_nev)) 
        from got_csatak
        group by csata_nev
    )
);
```

