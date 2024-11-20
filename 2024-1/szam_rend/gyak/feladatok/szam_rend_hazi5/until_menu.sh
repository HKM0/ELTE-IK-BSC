#!/bin/sh

echo -n "\n\n1:\n2:\n3:\n\nAdja meg a választ: "
read opt
until [ $opt -eq 3 ]; do
if [ $opt -eq 1 ]; then
echo elso
elif [ $opt -eq 2 ]; then
echo masodik
elif [ $opt -eq 3 ]; then
echo kilep
else
echo hulye
fi
if ! [ $opt -eq 3 ]; then
sleep 2
clear
echo -n "\n\n1:\n2:\n3:\n\nAdja meg a választ: "
read opt
fi
done 