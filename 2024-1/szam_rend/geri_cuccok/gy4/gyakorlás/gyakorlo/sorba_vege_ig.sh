#!/bin/sh

szoveg=0
echo -n > seged.txt
while [ $szoveg != 'vége' ]
do
read szoveg
if [ $szoveg != 'vége' ]
then
echo $szoveg >> seged.txt
fi
done

cat seged.txt | sort

rm seged.txt

