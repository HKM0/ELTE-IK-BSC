#include "utils.h"

int main(int argc, char *argv[]) {
    char fajl[100];

    // 1. Feladat
    color_print(elso_feladat());

    // 2. Feladat
    fajl_kep(fajl);
    kep k = kep_beolvas(fajl);
    image_print(k);
    kep_felszabadit(k);

    // 3. Feladat
    fajl_gif(fajl);
    gif g = gif_beolvas(fajl);
    print_gif(g);
    felszabadit(g);

    return 0;
}