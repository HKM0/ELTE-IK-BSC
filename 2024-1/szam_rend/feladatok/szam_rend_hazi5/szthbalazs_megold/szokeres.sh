#!/bin/sh
#ezt nem igy akarod megoldani
konyvtar=$1
szoveg=$2
cd $konyvtar
#grep -rl $szoveg
#konyvtarfull=`pwd`
fajlok=`grep -rl $szoveg` #| sed 's/gy/$konyvtar &/'
#pwd es expr haszn
for i in $fajlok
do
	echo -n $konyvtar
	if [ $konyvtar != '/' ]
	then
		echo -n '/'
	fi
	echo $i
done
