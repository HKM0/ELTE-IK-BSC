
if [ $# -ne 1 ]
then
    echo "Hiba! Pontosan 1 paraméter kell"
    exit 1
fi

if [ ! -f $1 ]
then
    echo "Hiba! A fájl nem létezik"
    exit 1
fi

for i in `cat $1`
do
    # Itt az stderr-t is átirányítom, hogy a hibaüzeneteket se printelje ki
    #  de ez nem olyan fontos. $i >/dev/null is jó
    $i >/dev/null 2>&1
    if [ $? -ne 0 ]
    then
        echo "apt-get install $i"
    else
        echo "$i telepítve" 
    fi
done