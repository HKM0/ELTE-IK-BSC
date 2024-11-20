#!/bin/sh

clear
echo
echo "Valasszon!"
echo
echo "1: Elso menupont"
echo "2: Masodik menupont"
echo "3: Kilepes"
echo
echo -n "Adja meg a megfelelo szamot: "
read x
until [ $x -le 3 -a $x -ge 1 ]
do
	echo "Rossz opciot adott meg!"
	read x
done
case $x in
	1)
		echo "Az elso menupontot valasztottad"
		sleep 2
		clear
		;;
	2)
		echo "A masodik menupontot valasztottad"
		sleep 2
		clear
		;;
	*)
		clear
		;;
esac

