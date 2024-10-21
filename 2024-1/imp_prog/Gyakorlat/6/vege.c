#include <stdio.h>

/*
*írj függvényt ami két azonos tömbön belüli elemre mutató mutatóról eldönti, hogy melyik mutat a kisebb indexű elemre.
*írj egy függvényt ami visszaadja egy tömb legnagyobb elemére mutató mutatót (miért jobb vagy rosszabb, mint indexet/elemet visszaadni?)
*írj egy függvényt, ami összegzi egy tömb elemeit az N.-től az M.-ig (használj mutatókat)!
*/


void* kisebbIndexu(int* p1, int* p2) {
    if (p1 < p2) {
        return p1;
    } else if (p1 > p2) {
        return p2;
    } else {
        return NULL;
    }
}

int* fajafejem(int T[], int size) {
    int maxIndex = 0;
    for (int i = 1; i < size; i++) {
        if (T[i] > T[maxIndex]) {
            maxIndex = i;
        }
    }
    return &T[maxIndex];
}

int nagyonfajafejem(int n, int m, int T[]) {
    int szumm = 0;
    int* pTn = T + n;
    int* pTm = T + m;
    for (int* p = pTn; p <= pTm; p++) {
        szumm += *p;
    }
    return szumm;
}



int main() {
    int a[] = {1, 2, 3, 4, 5};
    int* p1 = &a[1];
    int* p2 = &a[3];
    int* kisebb = kisebbIndexu(p1, p2);
    printf("Az elso pointer mutat a kisebb indexu elemre: %d\n", (kisebb == p1) ? *p1 : *p2);

    int T[] = {1, 2, 3, 4, 5};
    int size = sizeof(T) / sizeof(T[0]);
    printf("A legnagyobb elem: %d\n", *fajafejem(T, size));

    int n = 1;
    int m = 3;
    int szumma = nagyonfajafejem(n, m, T);
    printf("Az elemek osszege %d-tol %d-ig: %d\n", n, m, szumma);

    return 0;
}
