-- 2.feladat (5 pont) SQL UPDATE  -  Frissítse a Filmek táblát! Az összes 'USA' országhoz tartozó film Bevétel értékét növelje meg 15%-kal, de csak azoknál a filmeknél, ahol a Költség meghaladja a 10 millió egységet. Ahol a bevétel eredetileg NULL volt, ott maradjon továbbra is NULL.

--select bevétel from filmek;

update filmek
set filmek.bevétel = filmek.bevétel * 1.15
where filmek.költség >= 10000000 and filmek.bevétel is not null;

--select bevétel from filmek;
rollback;
