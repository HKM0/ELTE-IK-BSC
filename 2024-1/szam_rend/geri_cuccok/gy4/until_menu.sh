#!/bin/sh

until [ $szam -eq 3 ]
do
clear
echo
echo Válasszon!
echo ""
echo 1: Első menüpont
echo 2: Második menüpont
echo 3: Kilépes
echo
echo -n "Adja meg a megfelelő számot: "
read szam
case $szam in
1) echo Az elsőt választotta!
;;
2) echo A másodikat választotta!
;;
3) echo Kilépek!
;;
*) echo Rossz opciót adott meg!
esac
sleep 2
done
