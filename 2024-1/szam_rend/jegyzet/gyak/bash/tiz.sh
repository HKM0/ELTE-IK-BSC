#!/bin/sh

echo -n "Kérek egy számot: "
read szam
if [ $szam -gt 10 ]
then 
echo A szám nagyobb mint 10.
elif [ $szam -lt 10 ] 
then 
echo A szám kisebb mint 10.
else
echo A szám egyenlő 10-el.
fi
