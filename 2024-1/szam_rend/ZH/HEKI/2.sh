#!/bin/sh

maradek=100
for i in $*
do
if [ $i -gt 0 ]; then
    maradek=`expr $maradek - $i`
fi
done
echo "A pozitív értékek 100-ból kivonva az eredmény: $maradek"