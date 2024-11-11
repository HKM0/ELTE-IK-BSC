#!/bin/sh

if [ -z $1 ]
then
	echo -n "Kerem az elso szamot: "
	read a
else
	a=$1
fi
if [ -z $2 ]
then
	echo -n "Kerem a masodik szamot: "
	read b
else
	b=$2
fi

echo -n "$a+$b="
expr $a + $b
echo -n "$a-$b="
expr $a - $b
echo -n "$a*$b="
expr $a \* $b
echo -n "$a/$b="
expr $a / $b
