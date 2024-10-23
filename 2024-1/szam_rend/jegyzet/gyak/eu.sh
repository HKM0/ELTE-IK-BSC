#!/bin/sh

echo Első: $1
# utolso= echo "10 q w e 50" | cut -f5 -d' '
# utolso= echo "10 q w e 50" | cut -f$# -d' '
# utolso= echo $* | cut -f5 -d' '
utolso= echo $* | cut -f$# -d' '
echo Utolsó: $utolso
echo -n "Összegük: "
expr $1 + $utolso 
