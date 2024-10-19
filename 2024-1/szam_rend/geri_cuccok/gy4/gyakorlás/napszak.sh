#!/bin/sh

ora=`date +%H`
if [ $ora -lt 5 ]
then
echo Éjszaka van.
elif [ $ora -le 8 ]
then
echo Reggel van.
if [ $ora -le 12 ]
then
echo Délelőtt van.
if [ $ora -le 19 ]
then
echo Délután van.
else
echo Éjszaka van.
fi