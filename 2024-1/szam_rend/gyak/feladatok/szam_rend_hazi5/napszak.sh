#!/bin/sh

ora=`date +%H`
if [ $ora -lt 5 ]; then
    echo "este"
elif [ $ora -lt 9 ]; then
    echo "reggel"
elif [ $ora -lt 13 ]; then
    echo "délelőtt"
elif [ $ora -lt 20 ]; then
    echo "délután"
else
    echo "este"
fi