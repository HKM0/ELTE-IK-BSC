#!/bin/sh

echo -n "Kérem a szöveget: "
read szoveg
echo -n "Nagybetűkkel:     "

echo $szoveg | tr 'a-záéöüóőúűí' 'A-ZÁÉÖÜÓŐÚŰÍ'