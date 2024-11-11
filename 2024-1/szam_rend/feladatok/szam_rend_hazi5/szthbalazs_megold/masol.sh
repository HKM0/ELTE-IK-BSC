#!/bin/sh

forras="forras"
cel="cel"
echo -n "Forrás: "
read forras
echo -n "Cél:    "
read cel
cp $forras $cel
