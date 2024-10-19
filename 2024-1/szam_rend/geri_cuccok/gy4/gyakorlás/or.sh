#!/bin/sh

echo "Tartalmazzák or-t:" >or.txt
greo or sz.txt >>or.txt
echo "\nor-ral kezdődnek:" >>or.txt
grep ^or sz.txt >>or.txt
echo "\nor-ral végződnek:" >>or.txt
grep or$ sz.txt >>or.txt