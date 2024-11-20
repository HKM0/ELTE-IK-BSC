#!/bin/sh


case $1 in
	--help)
		echo "osszeadja a parameterkent adott szamokat"
		;;
	*)
		s=0
		db=$#
		for i in `seq $db`
		do
			s=`expr $s + $1`
			shift
		done
		echo $s
		;;
esac
