#!/bin/sh
echo -n "Kérem a szöveget:\t"
read szoveg

echo "Nagybetűkkel:\t$szoveg" | tr [a-z] [A-Z]



