#!/bin/sh

touch kecske
bemenet=baszás
until [ $bemenet = "vege" ]; do
    read bemenet
    echo "$bemenet" >> kecske
done
cat kecske | head -n-1 | sort -f
rm kecske