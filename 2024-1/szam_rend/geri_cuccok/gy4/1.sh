#!/bin/sh

if [ $# -gt 2 ]
then
echo Több mint 2 paranétert adott meg!
elif [ $# -eq 0 ]
then
echo -n "Kérem az osztandó értékét: "
read osztando
echo -n "Kérem az osztó értékét: "
read oszto
vegso=`expr $osztando "/" $oszto`
echo "$osztando/$oszto=$vegso"
elif [ $# -lt 2 ]
then
osztando=$1
echo -n "Kérem az osztó értékét: "
read oszto
vegso=`expr $osztando "/" $oszto`
echo "$osztando/$oszto=$vegso"
else
vegso=`expr $1 "/" $2`
echo "$1/$2=$vegso"
fi
