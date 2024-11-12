#!/bin/sh

case $1 in
-d)
date;;
-w)
who;;
-l)
ls;;
*)
echo Paraméterek:
echo "-d: date"
echo "-w: who"
echo "-l: ls"
;;
esac