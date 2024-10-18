
/*
írd meg ezt a lehető legegyszerűbb módon C-ben:
írj egy programot ami eg tombben kicsereli a legnagyobb es legkissebb elemet
írj egy progtramot ami beker egy szoveget (EOF-ig) és megszamolja a sorok szamar
írj egy függvényt ami megadja hogy eg szovegben hany manhangzo van (angol abc)
írj egy programot ami az excel oszlop -> szam konvertalasat vegzi (A->1 Z->26 AA->27)


*/

#include <stdio.h>
int a, b;
void csere(int *a, int *b) {
    int ideiglenes = *a;
    *a = *b;
    *b = ideiglenes;
}

int countVowels(const char str[]) {
    int count = 0;
    for (int i = 0; str[i] != '\0'; i++) {
        char ch = str[i];
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' ||
            ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
            count++;
        }
    }
    return count;
}

void MinCsereMax(int lista[], int size) {
    int minIndex = 0, maxIndex = 0;

    for (int i = 1; i < size; i++) {
        if (lista[i] < lista[minIndex]) {
            minIndex = i;
        }
        if (lista[i] > lista[maxIndex]) {
            maxIndex = i;
        }
    }
    csere(&lista[minIndex], &lista[maxIndex]);
}


int exelsor(const char col[]) {
    int number = 0;
    for (int i = 0; col[i] != '\0'; i++) {
        number = number * 26 + (col[i] - 'A' + 1);
    }
    return number;
}








int main() {
    //lista bekerese:
    int lista[] = {3, 1, 4, 1, 5, 9, 2, 6};

    //elso feladat:
    int meret = sizeof(lista) / sizeof(lista[0]);
    MinCsereMax(lista, meret);
    for (int i = 0; i < meret; i++) {
        printf("%d, ", lista[i]);
    }
    printf("\n");
    //masodik feladat: 

    int blyet, sorok = 0;
    while ((blyet = getchar()) != EOF) {
        if (blyet == '\n') {
            sorok++;
        }
    }
    printf("A sorok száma: %d\n", sorok);
    //harmadik feladat: 
    const char text[] = "Hello World!";
    printf("A magánhangzók száma: %d\n", countVowels(text));

    //negyedik feladat:
    const char col1[] = "A";
    const char col2[] = "Z";
    const char col3[] = "AA";
    const char col4[] = "AB";
    const char col5[] = "ZY";

    printf("%s -> %d\n", col1, exelsor(col1));
    printf("%s -> %d\n", col2, exelsor(col2));
    printf("%s -> %d\n", col3, exelsor(col3));
    printf("%s -> %d\n", col4, exelsor(col4));
    printf("%s -> %d\n", col5, exelsor(col5));

    return 0;
}

