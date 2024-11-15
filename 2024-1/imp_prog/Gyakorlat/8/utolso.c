#include <stdio.h>
#include <C:\Users\herce\Desktop\suli\2024\imp_prog\Gyakorlat\8\seged.h>
/*
1   Static változó segítségével hozz létre egy olyan faktoriális függvényt, mely számon tartja, 
    hogy hányszor hívták 1-nél kisebb paraméterrel!

2   Írj egy olyan függvényt, amely két int-et vár paraméterül, összeadja a számokat, és egy, 
    az eredményre mutató pointert ad vissza! Mi történik, mikor a main-ben kiirod az eredményt (dereferálva)?

3   Hozz létre külön modulokat (.h és .c párokat) az eddigi gyakorlatok függvényeiből! 
    pl Matematikai modult (faktoriális, stb), String Utils modult (strlen, strcpy saját implementációk), 
    ArrayUtils modult! Fordítsd le a modulokat külön-külön, majd írj egy main.c fájlt, 
    melyben include-olod őket és használod a függvényeiket, viszont úgy fordítsd a main.c állományt, 
    hogy a hivatkozott libeket ne fordítsd újra!

4   Hozz létre további függvényeket a my_utils.c file-ban! 
    A függvények hivatkozzanak egymásra! Ezeket a függvényeket meg tudod hívni a main.c fájlban is? 
    Miért? Miért nem?*/
int main() {
    for (int i = 0; i<15; i++){
        egybojlerxd(i);
    }
    int a = 1, b= 2;

    elegemvan(a, b);

    return 0;
}