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
