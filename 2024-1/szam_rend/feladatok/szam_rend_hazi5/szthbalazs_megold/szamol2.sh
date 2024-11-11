#!/bin/sh

#echo -n "$1+$2="
osszeg=`expr $1 + $2`
#echo $osszeg
#echo -n "$1-$2="
kulonbseg=`expr $1 - $2`
#echo $kulonbseg
#echo -n "$1*$2="
szorzat=`expr $1 \* $2`
#echo $szorzat
#echo -n "$1/$2="
hanyados=`expr $1 / $2`
#echo $hanyados
export osszeg #valamiert nem megy
export kulonbseg
export szorzat
export hanyados
#echo $osszeg
#echo $kulonbseg
#echo $szorzat
#echo $hanyados
env | less #nem set

