#!/bin/sh

if [ $# -eq 0 ]
then
echo "A legnagyobb érték: "
else
max=$1
for i in $*
do
if [ $i -gt $max ]
then
max=$i
fi
done
echo "A legnagyobb érték: $max"
fi