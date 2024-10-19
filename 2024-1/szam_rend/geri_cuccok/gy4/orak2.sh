nev=""
hetfo=""
kedd=""
szerda=""
csutortok=""
pentek=""
oradb=0
vanora=1

sor=`wc -l orak.txt | cut -d" " -f1`

echo "Tanárok, akiknek nincs szerdán órájuk:"
echo
for i in `seq $sor`
do
	marado=`expr $sor - $i + 1`
	aktualis=`tail -n$marado orak.txt | head -n1`
	nev=`echo $aktualis | cut -d"," -f1`
	hetfo=`echo $aktualis | cut -d"," -f2 | wc -w`
	kedd=`echo $aktualis | cut -d"," -f3 | wc -w`
	szerda=`echo $aktualis | cut -d"," -f4 | wc -w`
	csutortok=`echo $aktualis | cut -d"," -f5 | wc -w`
	pentek=`echo $aktualis | cut -d"," -f6 | wc -w`

	if [ $szerda -eq 1 ]
	then
		vanora=0
		echo $nev
	fi
done
if [ $vanora -eq 1 ]
then
	echo "NINCS"
fi

echo
echo "Az egyes tanárok összes óráinak a száma:"
for i in `seq 1 $sor`
do
	marado=`expr $sor - $i + 1`
	aktualis=`tail -n$marado orak.txt | head -n1`
	nev=`echo $aktualis | cut -d"," -f1`
	hetfo=`echo $aktualis | cut -d"," -f2 | wc -w`
	kedd=`echo $aktualis | cut -d"," -f3 | wc -w`
	szerda=`echo $aktualis | cut -d"," -f4 | wc -w`
	csutortok=`echo $aktualis | cut -d"," -f5 | wc -w`
	pentek=`echo $aktualis | cut -d"," -f6 | wc -w`

	oradb=`expr $hetfo + $kedd + $szerda + $csutortok + $pentek - 5`
echo "$nev $oradb"
done

echo
echo "Válasszon egy napot!"
echo
echo "Hétfő = 1"
echo "Kedd = 2"
echo "Szerda = 3"
echo "Csütörtök = 4"
echo "Péntek = 5"
echo
echo "Írja be az értéket!"
read adat
echo
case $adat  in
1)
	echo "Tanárok, akiknek a hét $adat. napján van első órájuk:"
	for i in `seq $sor`
	do
		marado=`expr $sor - $i + 1`
		aktualis=`tail -n$marado orak.txt | head -n1`
		nev=`echo $aktualis | cut -d"," -f1`
		hetfo=`echo $aktualis | cut -d"," -f2 | wc -w`
	if [ $hetfo -ne 1 ]
	then
		elsoora=`echo $aktualis | cut -d"," -f2 | cut -d" " -f2`
		if [ $elsoora -eq 1 ]
		then
		echo "$nev"
		fi
	fi
	done
;;
2)
	echo "Tanárok, akiknek a hét $adat. napján van első órájuk:"
        for i in `seq $sor`
        do
                marado=`expr $sor - $i + 1`
                aktualis=`tail -n$marado orak.txt | head -n1`
                nev=`echo $aktualis | cut -d"," -f1`
                kedd=`echo $aktualis | cut -d"," -f3 | wc -w`
        if [ $kedd -ne 1 ]
        then
		elsoora=`echo $aktualis | cut -d"," -f3 | cut -d" " -f2`
		if [ $elsoora -eq 1 ]
		then
                echo "$nev"
		fi
	fi
	done
;;
3)
	echo "Tanárok, akiknek a hét $adat. napján van első órájuk:"
        for i in `seq $sor`
        do
                marado=`expr $sor - $i + 1`
                aktualis=`tail -n$marado orak.txt | head -n1`
                nev=`echo $aktualis | cut -d"," -f1`
                szerda=`echo $aktualis | cut -d"," -f4 | wc -w`
        if [ $szerda -ne 1 ]
        then
                elsoora=`echo $aktualis | cut -d"," -f4 | cut -d" " -f2`
		if [ $elsoora -eq 1 ]
		then
		echo "$nev"
		fi
	fi
	done
;;
4)
	echo "Tanárok, akiknek a hét $adat. napján van első órájuk:"
        for i in `seq $sor`
        do
                marado=`expr $sor - $i + 1`
                aktualis=`tail -n$marado orak.txt | head -n1`
                nev=`echo $aktualis | cut -d"," -f1`
                csutortok=`echo $aktualis | cut -d"," -f5 | wc -w`
        if [ $csutortok -ne 1 ]
        then
               elsoora=`echo $aktualis | cut -d"," -f5 | cut -d" " -f2`
		if [ $elsoora -eq 1 ]
		then
		echo "$nev"
		fi
	fi
	done
;;
5)
	echo "Tanárok, akiknek a hét $adat. napján van első órájuk:"
        for i in `seq $sor`
        do
                marado=`expr $sor - $i + 1`
                aktualis=`tail -n$marado orak.txt | head -n1`
                nev=`echo $aktualis | cut -d"," -f1`
                pentek=`echo $aktualis | cut -d"," -f6 | wc -w`
        if [ $pentek -ne 1 ]
        then
                elsoora=`echo $aktualis | cut -d"," -f6 | cut -d" " -f2`
		if [ $elsoora -eq 1 ]
		then
		echo "$nev"
		fi
	fi
	done
;;
*) echo "Kérem helyesen adja meg az értéket!"
esac












