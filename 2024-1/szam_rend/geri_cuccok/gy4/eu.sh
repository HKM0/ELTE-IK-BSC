#!/bin/sh

echo elso: $1
utolso=`echo $* | cut -f$# -d ' '`
echo utolso: $utolso
echo `expr $1 + $utolso`
