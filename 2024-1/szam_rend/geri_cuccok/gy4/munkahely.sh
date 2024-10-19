#!/bin/sh

#A és B feladatrész megoldása és kiírása, C megoldása
fajl=$1

sorok=`wc -l $fajl | cut -d' ' -f1`

nincs=0
maximum=0
biztonsagiOrokSzum=0
echo Azok a munkahelyek ahol nem jelentettek erőszakos cselekedetet:

elsoSor=""
masodikSor=""
harmadikSor=0
negyedikSor=0

for i in `seq 1 $sorok`
do
maradekSorok=`expr $sorok - $i + 1`
sor=`tail -n$maradekSorok $fajl | head -n1`

elsoSor=`echo $sor | cut -d',' -f1`
masodikSor=`echo $sor | cut -d',' -f2`
harmadikSor=`echo $sor | cut -d',' -f3`
negyedikSor=`echo $sor | cut -d',' -f4`

if [ $harmadikSor -eq 0 ]
then
echo $elsoSor
nincs=1

fi

if [ $harmadikSor -gt $maximum ]
then
maximum=$harmadikSor
fi

biztonsagiOrokSzum=`expr $biztonsagiOrokSzum + $negyedikSor`

done

if [ $nincs -eq 0 ]
then
echo "NINCS"
fi
echo
echo "Az összes biztonsági őr az adatfájlban: $biztonsagiOrokSzum"
echo
#C feladatrész kiírása

echo "A legtöbb erőszakot jelentő munkahely(ek) neve(i) és címe(i):"

sorszam=1
for i in `seq 1 $sorok`
do
maradekSorok=`expr $sorok - $i + 1`
sor=`tail -n$maradekSorok $fajl | head -n1`

elsoSor=`echo $sor | cut -d',' -f1`
masodikSor=`echo $sor | cut -d',' -f2`
harmadikSor=`echo $sor | cut -d',' -f3`
negyedikSor=`echo $sor | cut -d',' -f4`
if [ $maximum -eq $harmadikSor ]
then
echo A $sorszam. munkahely neve és címe:
echo $elsoSor
echo $masodikSor
echo

sorszam=`expr $sorszam + 1`
fi
done