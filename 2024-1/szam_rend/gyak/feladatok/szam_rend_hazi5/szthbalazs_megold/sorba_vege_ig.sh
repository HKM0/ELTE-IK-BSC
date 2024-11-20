#!/bin/sh
#cat <<alma >temp.txt
a=alma
temp="temp09.txt"
echo -n "" >$temp
until [ $a = "vege" ]
do
	read a
	if [ $a != "vege" ]
	then
		echo $a >>$temp
	fi
done
cat $temp | sort
rm $temp
