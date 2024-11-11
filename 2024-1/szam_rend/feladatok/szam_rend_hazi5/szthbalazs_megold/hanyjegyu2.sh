#!/bin/sh
#ez is HEKI megoldasa, de <insert that Dani quote>

echo -n "Kerek egy szamot: "
read szam
jegy=`echo $szam | head -c-1 | tr -d "-" | wc -c
echo $jegy #ehelyett a caseszel kell feldolgozni a kapott adatot
