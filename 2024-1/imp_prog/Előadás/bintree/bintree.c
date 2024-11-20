#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// binaris rendezo / kereso fa
// alapveto adatszerkezetekben majd tanulni
// rekurziv meghivas
// mindig balrol kezdunk el
// 3 5 7 2 4 65 2 -3 5 6 3
// -3 2 2 3 3 4 5 5 6 7 65
// n elemnel O(log2(n)) lepesben erjuk el a beszurast, torlest, meg a keresest
// minden ilyen csomopont egy osszetett adatszerkezet -> struct
// minden ilyennek van az actually eltárolt értéke
// és minden ilyennek van maximum ketto gyereke, azokra mutato pointerek, ha nincs, akkor null pointer
// az egesz fa kezdojere van egy pointer
// nem tudom, hogy hany elem lesz -> malloc van az stdlib-ben
// EOF-ig kell egesz szamokat olvasni, utana berakni a faba
// erdemes a structot a main-en kivul deklaralni, mert a tovabbi, beszuras meg kiiras is fuggvenyek, ismerniuk kellene
// altalaban header .h file-ban tarolnank egy ilyen structot
struct Node
{
    int payload;
    // nem struct Node left, hanem egy ra mutato pointer
    struct Node *left;
    struct Node *right;
};

void insert(struct Node **r, int num); // *r -> *root
void print(struct Node *r);
void destroy(struct Node *r);

// valgrind bintree.exe -- memory leaket figyeli -- unixon
int main()
{   
    // le kellene generalni 1 millios bemenetet, hogy megnezzuk, hogy mukodik-e ra
    int num;
    int cnt = 0;
    // egy szamot scanf-el olvasnank be
    // ha a scanf sikeres, akkor = lesz 1-gyel
    // beolvasas EOF-ig
    struct Node *head = NULL;
    while (scanf("%d", &num) == 1) {
        // a fej ala beszurjuk a num-ot
        // insert(head, num); // itt 'head' az NULL pointer, érték szerint adtuk át!! nem tudja megváltoztatni, egy másolat lett generálva
        // mit kell tenni? -> valtozo cimet atadni -> &head
        insert(&head, num);
        // honlapon le van irva reszletesen
        ++cnt;
    }
    // custom print fuggveny
    fprintf(stderr, "sorted %d numbers\n", cnt); // azert stderr, hogy ne pofazzon feleslegesen
    print(head);
    destroy(head); // nem kell cimet atadni, mert nem akarunk modositani csak felszabaditani

    return 0;
}

void destroy(struct Node *r) {
    // hogy mukodne?
    // print-nel in-order bejaras van, bal gyerek, en, gyoker
    // itt post-order bejaras kell: eloszor a gyerekek utana en
    if (r) {
    }else {
        destroy(r->left);
        destroy(r->right);
        free(r); // minden gyerekre lefut, szoval minden gyerek fel lesz szabaditva
    }
}

void insert(struct Node **rp, int num)
{   
    //fprintf(stderr, "insert meghivodott erre: %d\n", num);
    // valahol allokálni kell memóriát
    // malloc akarmilyen tipusnak tud allokalni
    // szandekosan jelezzuk a forditonak, hogy Node pointerkent szeretnenk
    // ez itt, a (struct Node *) egy cast
    // kikapcsol egy forditasi ido warningot
    if(NULL == *rp) {
        *rp = (struct Node *)malloc(sizeof(struct Node));
        struct Node *r = *rp; // kulonben minden r helyere (*rp)-t kellene tenni
        // barmikor elfogyhat a memoria, vissza kell terni akkor errorral
        if(NULL == r) // = (!r)
        {
            fprintf(stderr, "nincs memoria!\n"); // hibauzenetet az errorra irok, azt at lehet iranyitani
            // erdemes nem bufferelten kiiratni a hibauzenetet -> stderr nem bufferelt, stdout igen
            exit(1); // 1 lesz a program visszateresi erteke
        }
        r->payload = num;
        r->left = NULL;
        r->right = NULL;
    } else {
        struct Node *r = *rp;
        if (num < r->payload) {
            insert(&r->left, num); // ennek is a cimet kell atadni (nem kell zarojel, mert a -> magasabb precedenciaju)
        //fprintf(stderr, "rekurziv left erre: %d\n", num);
        } else {
            insert(&r->right, num);
        //fprintf(stderr, "rekurziv right erre: %d\n", num);
        }
    }
    //fprintf(stderr, "csinaltam node-ot erre: %d\n", r->payload);
}

void print(struct Node *r) {
    // ha r null pointer, akkor nem lehet ra hivatkozni!
    // rekurziot meg kell valahogy allitani, ezert kellene elagazas
    if(r) { // ekvivalens azzal hogy r != NULL
        print(r->left); // r az ugye pointer, r -> left az rovidites a (*r.left)-re
        printf("%d ", r->payload);
        print(r->right);
    }
}