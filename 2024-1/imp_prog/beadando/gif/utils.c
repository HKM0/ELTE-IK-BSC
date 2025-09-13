#include "utils.h"

void color_print(szin sz) {
    if (sz == FEKETE) printf("%s ", BG_BLACK);
    else if (sz == PIROS) printf("%s ", BG_RED);
    else if (sz == ZOLD) printf("%s ", BG_GREEN);
    else if (sz == SARGA) printf("%s ", BG_YELLOW);
    else if (sz == KEK) printf("%s ", BG_BLUE);
    else if (sz == MAGENTA) printf("%s ", BG_MAGENTA);
    else if (sz == CIAN) printf("%s ", BG_CYAN);
    else if (sz == FEHER) printf("%s ", BG_WHITE);
    printf("%s", RESET);
}

szin elso_feladat() {
    int sz;
    szin szin_ertek;
    printf("Kerek egy szint [0-7]\tV: ");
    scanf("%d", &sz);

    if (sz == 0) szin_ertek = FEKETE;
    else if (sz == 1) szin_ertek = PIROS;
    else if (sz == 2) szin_ertek = ZOLD;
    else if (sz == 3) szin_ertek = SARGA;
    else if (sz == 4) szin_ertek = KEK;
    else if (sz == 5) szin_ertek = MAGENTA;
    else if (sz == 6) szin_ertek = CIAN;
    else if (sz == 7) szin_ertek = FEHER;

    return szin_ertek;
}

kep kep_beolvas(const char *fajl) {
    FILE *file = fopen(fajl, "r");
    kep k;

    fscanf(file, "%d", &k.szelesseg);
    fscanf(file, "%d", &k.magassag);

    k.matrix = (szin **)malloc(k.magassag * sizeof(szin *));
    for (int i = 0; i < k.magassag; i++) {
        k.matrix[i] = (szin *)malloc(k.szelesseg * sizeof(szin));
        for (int j = 0; j < k.szelesseg; j++) {
            int szin_ertek; 
            fscanf(file, "%d", &szin_ertek);
            k.matrix[i][j] = (szin)szin_ertek;
        }
    }
    fclose(file);
    return k;
}

void image_print(kep k) {
    for (int i = 0; i < k.magassag; i++) {
        for (int j = 0; j < k.szelesseg; j++) {
            color_print(k.matrix[i][j]);
        }
        printf("\n");
    }
}

void kep_felszabadit(kep k) {
    for (int i = 0; i < k.magassag; i++) {
        free(k.matrix[i]);
    }
    free(k.matrix);
}

gif gif_beolvas(const char *fajlnev) {
    gif g;
    char fajl[100];
    for (int i = 0; i < 10; i++) {
        sprintf(fajl, "%s.bg%d", fajlnev, i);
        g.kepek[i] = kep_beolvas(fajl);
    }
    return g;
}

void print_gif(gif g) {
    for (int i = 0; i < 10; i++) {
        printf("%s%s", TERMINAL_CLEAR, TERMINAL_HOME);
        image_print(g.kepek[i]);
        Sleep(1000);
        //sleep(1);
    }
}

void felszabadit(gif g) {
    for (int i = 0; i < 10; i++) {
        kep_felszabadit(g.kepek[i]);
    }
}

void fajl_kep(char *fajl) {
    printf("\nKerem a kep fajl nevet [input.bg0]\tV: ");
    scanf("%s", fajl);
}

void fajl_gif(char *fajl) {
    printf("\nKerem a gif fajl nevet [input]\tV: ");
    scanf("%s", fajl);
}
