#!/bin/sh
fajl="or.txt"
echo "Tartalmazzak or-t:" >$fajl
cat sz.txt >>$fajl
echo >>$fajl
echo "or-ral kezdodnek:" >>$fajl
cat sz.txt | grep "\<or" >>$fajl
echo >>$fajl
echo "or-ral vegzodnek:" >>$fajl
cat sz.txt | grep "or\>" >>$fajl

