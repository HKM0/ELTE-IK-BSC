#!/bin/sh

x=1
if [ -z $1 ] # [ -n $2 ]
then
	echo "Kerem pontosan egy parametert adjon!"
	return 1
fi
if [ $# -gt 1 ]
then
	echo "Kerem pontosan egy parametert adjon!"
	return 2
fi
if [ `expr $1 \* 1 2>/dev/null` ]
then
	if [ $1 -lt 0 ]
	then
		echo "Kerem ne adjon negativ parametert!"
	else
		#if [ $1 -eq 0 ]
		#then
		#	echo "$1 faktorialisa: 1"
		#	return 0
		#fi
		for i in `seq $1`
		do
			x=`expr $x \* $i`
		done
		echo "$1 faktorialisa: $x"
	fi


else
	echo "Kerem csak szamjegyeket irjon parameterkent!"
fi
