#!/bin/sh
hour=`date +%H`
if [ $hour -le 4 -o $hour -ge 20 ]
then
	echo "Ejszaka van."
else 
	if [ $hour -le 8 ]

	then
	
		echo "Reggel van."

	else 
		if [ $hour -le 12 ]
		then
			echo "Delelott van."
		else
			echo "Delutan van."
		fi
	fi
fi
	
