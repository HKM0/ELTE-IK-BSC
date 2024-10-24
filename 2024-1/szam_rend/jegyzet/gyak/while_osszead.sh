#!/bin/sh

i=1
s=0
while [ $i -le 5 ]
do
echo -n Kérem az $i. számot:" " 
read x
s=`expr $s + $x`
i=`expr $i + 1`
done
echo A beírt számok összege: $s 
