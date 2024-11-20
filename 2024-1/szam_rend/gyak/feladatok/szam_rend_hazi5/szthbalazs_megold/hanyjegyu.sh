#!/bin/sh
#ez sem egy szep megoldas, de legalabb mukodik (az egysoros menobb)
count=10
echo -n "Kerek egy szamot: "
read x
ell=`expr $x / $count`
while [ $count -lt 10001 -a `expr $x / $count` -ne 0 ]
do
	count=`expr $count \* 10`
done
case $count in
	10)
		echo "A szam egyjegyu!"
		;;
	100)
		echo "A szam ketjegyu!"
		;;
	1000)
		echo "A szam haromjegyu!"
		;;
	*)
		echo "A szam tobb mint haromjegyu!"
		;;
esac
