#!/bin/sh

echo -n "Kérek egy számot: "
read szam;
if [ $szam -gt -10 -a $szam -lt 10 ]
then
echo A szám egyjegyű!
elif [ $szam -gt -100 -a $szam -lt 100 ]
then
echo A szám kétjegyű!
elif [ $szam -gt -1000 -a $szam -lt 1000 ]
then
echo A szám háromjegyű!
else
echo A szám több mint háromjegyű!
fi