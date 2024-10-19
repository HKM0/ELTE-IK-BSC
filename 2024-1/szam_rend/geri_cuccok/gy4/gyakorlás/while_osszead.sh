#!/bin/sh

ossz=0
i=1
while [ $i -le 5 ] 
do
echo "Kérem a(z)" $i". számot: "
read szam
ossz=`expr $szam + $ossz`
i=`expr $i + 1`
done
echo A beírt számok összege: $ossz
