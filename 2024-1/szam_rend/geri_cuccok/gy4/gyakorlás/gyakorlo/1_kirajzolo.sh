#!/bin/sh

if [ $# -ne 1 ]
then
    echo "Hiba! Pontosan 1 paraméter kell"
    exit 1
fi

for i in `seq $1`
do
    for k in `seq $1`
    do
        if [ $i -eq $k -o `expr $i + $k` -eq `expr $1 + 1` ]
        then
            echo -n "X"
        else
            echo -n " "
        fi
    done
    echo ""
done