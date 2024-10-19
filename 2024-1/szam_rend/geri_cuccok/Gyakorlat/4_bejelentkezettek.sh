#!/bin/sh

users=$(who | cut -d " " -f 1)

if [ -f ./temp.txt ]; then
	rm ./temp.txt
fi
touch ./temp.txt
for i in $users; do
	if [ $(grep -c $i ./temp.txt) -eq 0 ]; then
		count=$(who | grep -c $i)
		echo "$i $count" >> temp.txt
	fi
done

cat temp.txt
rm temp.txt
