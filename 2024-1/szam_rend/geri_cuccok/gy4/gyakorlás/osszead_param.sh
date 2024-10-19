#!/bin/sh

if [ $# -gt 0 ]
then
if [ $1 = "--help" ]
then
echo A program összeadja a paraméterként átadott számokat.
echo példa:
echo $0 10 5 15
echo 30
else
szum=0
i=1
while [ $i -le $# ]
do
ert=`echo $* | cut -f$i -d ' '`
szum=`expr $szum + $ert`
i=`expr $i + 1`
done
echo $szum
fi
fi