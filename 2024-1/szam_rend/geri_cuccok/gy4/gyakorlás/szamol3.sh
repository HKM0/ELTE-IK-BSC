#!/bin/sh

a=$1
b=$2
if [ $# -lt 2 ]
then
if [ $# -lt 1 ]
then
echo -n "Kérem a első számot: "
read a
fi
echo -n "Kérem a második számot: "
read b
fi

...szamol.sh