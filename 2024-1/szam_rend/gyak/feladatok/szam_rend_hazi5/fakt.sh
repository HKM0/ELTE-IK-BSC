#!/bin/sh

szam=$1
szam=a$szam
szam=`echo $szam | tr -d [0-9-]`

if [ $szam = a ]; then
if [ $# -eq 1 ]; then
if [ $1 -lt 0 ]; then
echo 0 nal nagyobb kell oda.
else
szam=1
    for i in $(seq $1); do
	szam=$(expr $szam \* $i)
    done
echo $szam
echo bruh
fi
else
    echo szex 1 valtozo

fi
else
echo csak szamot pls
fi