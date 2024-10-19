#!/bin/sh

echo -n $1+$2=
expr $1 + $2
echo -n $1-$2=
expr $1-$2
echo -n "$1*$2"=
expr $1\*$2
echo -n $1/$2=
expr $1/$2