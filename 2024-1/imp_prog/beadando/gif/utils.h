#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

#define RESET "\033[0m"
#define BG_BLACK "\033[40m"
#define BG_RED "\033[41m"
#define BG_GREEN "\033[42m"
#define BG_YELLOW "\033[43m"
#define BG_BLUE "\033[44m"
#define BG_MAGENTA "\033[45m"
#define BG_CYAN "\033[46m"
#define BG_WHITE "\033[47m"

#define TERMINAL_CLEAR "\033[2J"
#define TERMINAL_HOME "\033[2H"

#define MAX_MERET 30

typedef enum {
    FEKETE,
    PIROS,
    ZOLD,
    SARGA,
    KEK,
    MAGENTA,
    CIAN,
    FEHER
} szin;

typedef struct {
    szin **matrix;
    int szelesseg;
    int magassag;
} kep;

typedef struct {
    kep kepek[10];
} gif;

void color_print(szin sz);
szin elso_feladat();

kep kep_beolvas(const char *fajl);
void image_print(kep k);
void kep_felszabadit(kep k);

gif gif_beolvas(const char *fajlnev);
void print_gif(gif g);
void felszabadit(gif g);

void fajl_kep(char *fajl);
void fajl_gif(char *fajl);