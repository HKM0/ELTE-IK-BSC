

if [ ! -d $1 ]
then
    echo "Hiba! A mappa nem létezik"
    exit 1
fi

if [ ! -d log ]
then
    mkdir log
fi

if [ ! -d txt ]
then
    mkdir txt
fi


for logFajl in `ls $1 | grep ".log"`
do
    cp $1/$logFajl ./log
done

for txtFajl in `ls $1 | grep ".txt"`
do
    cp $1/$txtFajl ./txt
done