nincseroszak=""
iskolaorok=0
legtobberoszak=""
max=0
nincs=0

echo "a feladat"
echo "Nincs erőszak:"

while read line
do
    iskolaneve=`echo $line | cut -d',' -f1`
    cim=`echo $line | cut -d',' -f2`
    eroszak=`echo $line | cut -d',' -f3`
    iskolaor=`echo $line | cut -d',' -f4`


if [ $eroszak -eq 0 ] ; then
    echo $iskolaneve
    nincs=1
fi

    iskolaorok=`expr $iskolaorok + $iskolaor`


if [ $eroszak -gt $max ]; then
    max=$eroszak
fi

done < $1


if [ $nincs -eq 0 ] ; 
then
    echo "NINCS"
fi

echo "b feladat"
echo "Az iskolaőrök száma:"
echo $iskolaorok

echo "c feladat"
echo "Legtöbb erőszak:"

while read line
do
    iskolaneve=`echo $line | cut -d',' -f1`
    cim=`echo $line | cut -d',' -f2`
    eroszak=`echo $line | cut -d',' -f3`

if [ $max -eq $eroszak ]
then
    echo "Neve:" $iskolaneve "Címe: " $cim
fi

done < $1
