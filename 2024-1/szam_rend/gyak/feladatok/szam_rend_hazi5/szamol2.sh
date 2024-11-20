#!/bin/sh

echo -n "Kérem az első számot:\t"
read szam1
echo -n "Kérem a második számot:\t"
read szam2
echo -n "\n$szam1+$szam2="
export OSSZEG=`expr $szam1 + $szam2`
echo -n "\n$szam1-$szam2="
export KULONBSEG=`expr $szam1 - $szam2`
echo -n "\n$szam1*$szam2="
export SZORZAT=`expr $szam1 \* $szam2`
echo -n "\n$szam1/$szam2=\n"
export HANYADOS=`expr $szam1 / $szam2`

echo $OSSZEG
echo $KULONBSEG
echo $SZORZAT
echo $HANYADOS

env | less