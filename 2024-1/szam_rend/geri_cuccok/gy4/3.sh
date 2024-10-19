#!/bin/sh

until [ $N -eq 0 ] 2>/dev/null
do
echo "Hány felhasználót listázzak?"
read N

who | sort | head -n$N
done