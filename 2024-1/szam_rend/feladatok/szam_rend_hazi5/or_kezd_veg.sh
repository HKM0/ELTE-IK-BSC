#!/bin/sh

cat sz.txt | grep -e'or'
echo ""
cat sz.txt | grep -e'^or'
echo ""
cat sz.txt | grep -e 'or$'