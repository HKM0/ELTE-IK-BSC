#include <stdio.h>
#include <stdlib.h>


//a mátrix egy pointerek listája, azon belül vannak a sorok amik pointerek a sor elemeire.
int** matrix(int sorok, int oszlopok){
    int** matrix = malloc(sorok * sizeof(int *));   //lefoglalok a sorok száma szerinti memóriát, integer pointereknek, ezek lesznek a sorok. 
    for (int i = 0; i < sorok; i++){
        matrix[i] = malloc(oszlopok * sizeof(int)); // itt pedig a korábban lefoglalt sorokba foglalok le az oszlopok száma szerint sima integereknek
    }
    return matrix;
}
/*
különbség a malloc és calloc között: 
malloc és calloc is memóriát foglal le, de a calloc 0-kal tölti fel kezdő értéknek és egyből használható.
a malloc által lefoglalt memóriát nekünk kell feltölteni adatokkal, mielőtt használni tudnánk.
*/

//csak simán értéket adok a mátrix elemeinek.
void elkaplak(int** matrix, int sorok, int oszlopok){
    for (int i = 0; i < sorok; i++){
        for (int j=0; j < oszlopok; j++){
            matrix[i][j]=i*j;
        }
    }
}

/* kiírom a mátrixot ami ugye egy pointer amiben pointerek vannak vagyis pointerek pointerei
PL:
matrixpointer=
    sorPointer1 = [elem1,elem2,elem3,elem4]
    sorPointer2 = [elem1,elem2,elem3,elem4]
    sorPointer3 = [elem1,elem2,elem3,elem4]
    sorPointer4 = [elem1,elem2,elem3,elem4]

vagyis a mátrix használható úgy mint pl matrix[sor][oszlop] ahol a sor az a mátrix N-edig sora és azon belül az oszlop az N-edig elem.
*/
void bojler(int** matrix, int sorok, int oszlopok){
    for ( int i = 0; i < sorok; i++)
    {
        for (int j = 0; j < oszlopok; j++){
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }
}
// ez csak a lefoglalt memória feloldása, mindig feloldjuk elemenként és utána a teljes mátrixot, ugyanis van egy mátrix 1 dimenziós listánk ami [pointer1, pointer2, pointer3, stb...]
// a free csak pointerekre működik, a megadott mutató helyén oldja fel a lefoglalt memóriát.
// minden sorra (i vagyis az 1 dimenziós mátrix pointerein) megyunk végig és oldjuk fel azokat.
// a végén feloldjuk a soroknak lefoglalt memóriát (vagyis a mátrixot).
void deleteSYS32xd(int** matrix, int sorok, int oszlopok){
    for (int i = 0; i < sorok; i++)
    {
        free(matrix[i]);
    }
    free(matrix);
}
//actually a felszabadítást egyszerű megjegyezni ha úgy nézed hogy fordított sorrendben szabadítod fel mint ahogy lefoglaltad.

int main(){
    int a=3,b=3;                 // sorok és oszlopok száma
    int** kecske = matrix(a,b);  // mátrix létrehozása
    elkaplak(kecske, a, b);      // adatokkal feltöltés
    bojler(kecske, a, b);        // kiírás
    deleteSYS32xd(kecske, a, b); //memória felszabadítás
    return 0;
}