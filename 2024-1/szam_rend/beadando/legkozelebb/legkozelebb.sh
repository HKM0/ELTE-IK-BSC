#!/bin/bash

ido=""
minimum=-1
while read -r "sor"; do
    elolrol=$(echo "$sor" | cut -d',' -f3)
    hatulrol=$(echo "$sor" | cut -d',' -f4)

    if [ $minimum -eq -1 ]; then
        minimum=$elolrol
    fi
    if [ $elolrol -lt $minimum ]; then
        minimum=$elolrol
        ido=$(echo "$sor" | cut -d',' -f1 | cut -d' ' -f2)
    fi
    if [ $hatulrol -lt $minimum ]; then
        minimum=$hatulrol
        ido=$(echo "$sor" | cut -d',' -f1 | cut -d' ' -f2)
    fi
done < "bemenet.txt"
echo "$ido"