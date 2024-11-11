#!/bin/sh

echo -n "\n$1+$2="
expr $1 + $2
echo -n "\n$1-$2="
expr $1 - $2
echo -n "\n$1*$2="
expr $1 \* $2
echo -n "\n$1/$2="
expr $1 / $2
