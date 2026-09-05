#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FAJLNEV "adatok.txt"
#define REALLOC_LEPES 16 // realloc lepes

typedef struct {
    char *termohely;
    char *tabla;
    char *fajta;
    int terulet;
    int pusztitas;
} Szoleszet;

Szoleszet *adatok = NULL;
int rekord_db = 0;
int hely = 0;

void rekord_torol(Szoleszet *r) {
    free(r->termohely);
    free(r->tabla);
    free(r->fajta);
    r->termohely = NULL;
    r->tabla = NULL;
    r->fajta = NULL;
}

int ures_c(char c) {
    return c == ' ' || c == '\t' || c == '\n';
}

void ossz_rekord_torol() {
    for (int i = 0; i < rekord_db; i++) {
        rekord_torol(&adatok[i]);
    }
    rekord_db = 0;
}

char *sor_beolvas(FILE *f) {
    size_t kap_hely = 128;
    size_t hossz = 0;
    int c;
    char *sor = malloc(kap_hely);

    if (!sor) {
        return NULL;
    }

    while ((c = fgetc(f)) != EOF) {
        if (hossz + 1 >= kap_hely) {
            kap_hely *= 2;
            char *uj = realloc(sor, kap_hely);
            if (!uj) {
                free(sor);
                return NULL;
            }
            sor = uj;
        }

        if (c == '\n') {
            break;
        }
        if (c == '\r'){ 
            continue;
        }
        sor[hossz++] = (char)c;
    }

    if (c == EOF && hossz == 0) {
        free(sor);
        return NULL;
    }

    sor[hossz] = '\0'; // sor veg
    return sor;
}

char *kov_token(const char **pointer) {
    const char *p = *pointer;
    while (*p && ures_c(*p)) p++;
    if (!*p) {
        *pointer = p;
        return NULL;
    }

    const char *start = p;
    while (*p && !ures_c(*p)) p++;

    size_t hossz = (size_t)(p - start);
    char *token = malloc(hossz + 1);
    if (!token) {
        *pointer = p;
        return NULL;
    }

    memcpy(token, start, hossz);
    token[hossz] = '\0'; // itt is sor veg, mert nem masolja at :(
    *pointer = p;
    return token;
}

int token_int(const char *token, int *ertek) {
    char *vege;
    long szam = strtol(token, &vege, 10);
    if (token[0] == '\0' || *vege != '\0') return 0;

    int h_szam = (int)szam;
    if ((long)h_szam != szam) return 0;

    *ertek = h_szam;
    return 1;
}

int sor_rekord(const char *sor, Szoleszet *rekord) {
    const char *p = sor;
    char *termohely = kov_token(&p);
    char *tabla = kov_token(&p);
    char *fajta = kov_token(&p);
    char *terulet_token = kov_token(&p);
    char *pusztitas_token = kov_token(&p);

    if (!termohely || !tabla || !fajta || !terulet_token || !pusztitas_token) {
        free(termohely);
        free(tabla);
        free(fajta);
        free(terulet_token);
        free(pusztitas_token);
        return 0;
    }

    while (*p && ures_c(*p)) p++;
    if (*p != '\0') {
        free(termohely);
        free(tabla);
        free(fajta);
        free(terulet_token);
        free(pusztitas_token);
        return 0;
    }

    int terulet;
    int pusztitas;
    if (!token_int(terulet_token, &terulet) || !token_int(pusztitas_token, &pusztitas)) {
        free(termohely);
        free(tabla);
        free(fajta);
        free(terulet_token);
        free(pusztitas_token);
        return 0;
    }

    free(terulet_token);
    free(pusztitas_token);

    rekord->termohely = termohely;
    rekord->tabla = tabla;
    rekord->fajta = fajta;
    rekord->terulet = terulet;
    rekord->pusztitas = pusztitas;
    return 1;
}

int meret_check(int minimum_db) {
    if (minimum_db <= hely) return 1;

    int uj_hely = hely;
    while (uj_hely < minimum_db) {
        uj_hely += REALLOC_LEPES;
    }

    Szoleszet *uj_adatok = realloc(adatok, uj_hely * sizeof(Szoleszet));
    if (!uj_adatok) {
        printf("Nincs eleg memoria!\tDraga a ram :(\n");
        return 0;
    }

    adatok = uj_adatok;
    hely = uj_hely;
    return 1;
}

void beolvas() {
    FILE *f = fopen(FAJLNEV, "r");
    if (!f) return;

    ossz_rekord_torol();

    char *sor;
    while ((sor = sor_beolvas(f)) != NULL) {
        if (sor[0] == '\0') {
            free(sor);
            continue;
        }

        Szoleszet uj = {0};
        if (!sor_rekord(sor, &uj)) {
            free(sor);
            continue;
        }

        if (!meret_check(rekord_db + 1)) {
            rekord_torol(&uj);
            free(sor);
            fclose(f);
            return;
        }

        adatok[rekord_db] = uj;
        rekord_db++;
        free(sor);
    }

    fclose(f);
}

int be_int(const char *uzenet, int *ertek) {
    printf("%s", uzenet);

    char *sor = sor_beolvas(stdin);
    if (!sor) {
        return 0;
    }

    const char *p = sor;
    char *token = kov_token(&p);
    while (*p && ures_c(*p)) {
        p++;
    }

    int siker = token && *p == '\0' && token_int(token, ertek);
    free(token);
    free(sor);
    return siker;
}

void rekord_kiir(int i) {
    printf("%d. %s, %s tabla, %s, %d negyszogol, %d%%\n", i + 1, adatok[i].termohely, adatok[i].tabla, adatok[i].fajta, adatok[i].terulet, adatok[i].pusztitas);
}

void mentes() {
    FILE *f = fopen(FAJLNEV, "w");
    if (!f) return;

    for (int i = 0; i < rekord_db; i++) {
        fprintf(f, "%s %s %s %d %d\n", adatok[i].termohely, adatok[i].tabla, adatok[i].fajta, adatok[i].terulet, adatok[i].pusztitas);
    }

    fclose(f);
}

void hozzaad() {
    printf("Add meg az adatokat (Termohely Tabla Fajta Terulet Pusztitas):\n");

    char *sor = NULL;
    do {
        free(sor);
        sor = sor_beolvas(stdin);
        if (!sor) {
            printf("Hibas bemenet!\n");
            return;
        }
    } while (sor[0] == '\0');

    Szoleszet uj = {0};
    if (!sor_rekord(sor, &uj)) {
        printf("Hibas bemenet!\n");
        free(sor);
        return;
    }

    free(sor);

    if (!meret_check(rekord_db + 1)) {
        rekord_torol(&uj);
        return;
    }

    adatok[rekord_db] = uj;

    rekord_db++;
    mentes();
}

void listaz() {
    if (rekord_db == 0) {
        printf("Nincs adat :(\n");
        return;
    }

    for(int i = 0; i < rekord_db; i++) {
        rekord_kiir(i);
    }
}

void torles() {
    if (rekord_db == 0) {
        printf("Nincs torolheto rekord!\n");
        return;
    }

    listaz();

    int sorszam;
    if (!be_int("Torlendo rekord sorszama: ", &sorszam)) {
        printf("Hibas bemenet!\n");
        return;
    }

    if (sorszam < 1 || sorszam > rekord_db) {
        printf("Nincs ilyen rekord!\n");
        return;
    }

    int index = sorszam - 1;
    rekord_torol(&adatok[index]);

    for (int i = index; i < rekord_db - 1; i++) {
        adatok[i] = adatok[i + 1];
    }

    rekord_db--;
    mentes();
    printf("Rekord torolve.\n");
}

void modositas() {
    if (rekord_db == 0) {
        printf("Nincs modositando rekord!\n");
        return;
    }

    listaz();

    int sorszam;
    if (!be_int("Modositando rekord sorszama: ", &sorszam)) {
        printf("Hibas bemenet!\n");
        return;
    }

    if (sorszam < 1 || sorszam > rekord_db) {
        printf("Nincs ilyen rekord!\n");
        return;
    }

    printf("Add meg az uj adatokat (Termohely Tabla Fajta Terulet Pusztitas):\t");

    char *sor = NULL;
    do {
        free(sor);
        sor = sor_beolvas(stdin);
        if (!sor) {
            printf("Hibas bemenet!\n");
            return;
        }
    } while (sor[0] == '\0');

    Szoleszet uj = {0};
    if (!sor_rekord(sor, &uj)) {
        printf("Hibas bemenet!\n");
        free(sor);
        return;
    }

    free(sor);

    int index = sorszam - 1;
    rekord_torol(&adatok[index]);
    adatok[index] = uj;

    mentes();
    printf("Rekord modositva.\n");
}

void szurt_listaz() {
    if (rekord_db == 0) {
        printf("Nincs adat :(\n");
        return;
    }

    int tipus;
    if (!be_int("Szuro tipusa (1: Termohely, 2: Fajta):\t", &tipus)) {
        printf("Hibas bemenet!\n");
        return;
    }

    if (tipus != 1 && tipus != 2) {
        printf("Hibas tipus!\n");
        return;
    }

    printf("Szuro ertek:\t");
    char *ertek = sor_beolvas(stdin);
    if (!ertek || ertek[0] == '\0') {
        printf("Hibas bemenet!\n");
        free(ertek);
        return;
    }

    int talalat = 0;
    for (int i = 0; i < rekord_db; i++) {
        const char *mezo = (tipus == 1) ? adatok[i].termohely : adatok[i].fajta;
        if (strcmp(mezo, ertek) == 0) {
            rekord_kiir(i);
            talalat++;
        }
    }

    if (talalat == 0) {
        printf("Nincs talalat.\n");
    }

    free(ertek);
}

void bemenet_reset() {
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {
    }
}

int main() {
    beolvas();
    int valasztas = 0;
    
    do {
        printf("\n1. Hozzaadas\n2. Torles\n3. Modositas\n4. Listazas\n5. Egyedi listazas\n6. Kilepes\nV:\t");
        if (scanf("%d", &valasztas) != 1) {
            printf("Ervenytelen opcio!\n");
            bemenet_reset();
            continue;
        }
        bemenet_reset();
        
        switch(valasztas) {
            case 1: hozzaad(); break;
            case 2: torles(); break;
            case 3: modositas(); break;
            case 4: printf("\n"); listaz(); break;
            case 5: printf("\n"); szurt_listaz(); break;
            case 6: printf("Kilepes...\n"); break;
            default: printf("Ervenytelen opcio!\n");
        }
    } while(valasztas != 6);

    ossz_rekord_torol();
    free(adatok);
    
    return 0;
}