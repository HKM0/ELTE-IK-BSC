#!/bin/sh

szame=`echo -n $1 | tr -d 0-9-`
if [ $# -ge 2 ]
then
echo "Kérem pontosan egy paramétert adjon!"
else
if [ -z $szame ]
then
if [ $1 -ge 0 ]
then
fakt=1
i=2
while [ $i -le $1 ]
do
fakt=`expr $fakt \* $i`
i=`expr $i + 1`
done
echo $1 faktoriálisa: $fakt
else
echo "Kérem ne adjon negatív paramétert!"
fi
else
echo "Kérem csak számjegyeket írjon paraméterként!"
fi
fi