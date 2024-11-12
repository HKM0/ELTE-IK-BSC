#!/bin/sh
N=1
until [ $N -eq 0 ]; do
echo "Hány felhasználót listázzak?"
read N
if [ $N -eq 0 ]; then
break
else
who | tr -s " " | cut -d " " -f1,5 | tr -d "()" | tr " " "-" | head -n $N
fi
done