#!/bin/sh

if [ $# -le 2 ]; then
    if [ $# -eq 2 ]; then
	osszeg=`expr $1 \* $1 - $2 \* $2`
	echo "A másik befogó hosszának összege: ($1*$1-$2*$2)=$osszeg"
    elif [ $# -eq 1 ]; then
	echo -n "Kérem a befogó értékét: "
	read x
	osszeg=`expr $1 \* $1 - $x \* $x`
	echo "A másik befogó hosszának összege: ($1*$1-$x*$x)=$osszeg"
    else
	echo -n "Kérem az átfogó értékét: "
	read x
	echo -n "Kérem a befogó értékét: "
	read y
	osszeg=`expr $x \* $x - $y \* $y`
	echo "A másik befogó hosszánok összege: ($x*$x-$y*$y)=$osszeg"
    fi

else
    echo "Több mint 2 paramétert adott meg!"
fi