#!/bin/sh

echo -n "Kérek egy számot: "
read szam
echo $szam | head -c-1 | tr -d "-" | wc -c
