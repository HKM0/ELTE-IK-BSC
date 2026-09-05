-- 1.feladat (5 pont) SQL DELETE  -  Törölje azokat a rendezőket a Rendezok táblából, akikhez nem tartozik egyetlen film sem a Filmek táblában.

--select * from rendezok;

delete from rendezok
where nev not in (select RENDEZŐNÉV from filmek);

--select * from rendezok;
rollback;
