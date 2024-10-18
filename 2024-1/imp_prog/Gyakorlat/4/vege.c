#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#define PI 3.14159265358979323846


// elso feladat
int getint(){
    int a;
    scanf("%d",&a);
    int b;
    scanf("%d",&b);
    printf("+ = %d\t- = %d\t* = %d\t/ = %d",(a + b),(a - b),(a * b),(a / b));
}

//olvasd be egy kor sugarat és szamold ki a kor atmerojet, teruletet, keruletet
void getkor() {
    int x;
    printf("Add meg a kör sugarát: ");
    scanf("%d", &x);
    printf("A kor atmeroje: %d,\tterulete: %.2f,\tkerulete: %.2f",( 2 * x),(PI * x * x),(2 * PI * x));}

//olvass be egy datumot és adj vissza másik formatumban
int getdatum(){
    int datum;
    scanf("%d",&datum);
    printf("%d-%d-%d",(datum/10000),((datum-(datum/10000)*10000)/100),(datum-((datum/10000)*10000))-((datum-(datum/10000)*10000)/100)*100);
}

//olvass be 2 koordinatat és add meg hogy merolegesek egymasra vagy sem.
void koordinata(){
    int x1,y1,x2,y2;
    printf("Kerem a koordinatakat [x1;y1],[x2;y2] : ");
    scanf("[%d;%d],[%d;%d]",&x1,&y1,&x2,&y2);
    if ((x1 * x2 + y1 * y2) == 0) {
        printf("Merolegesek.\n");
    } else {
        printf("Nem merolegesek.\n");
    }
}

//olvasd be egy egyenlo szaru haromszog oldalait és szamold ki a teruletet és kerületet
int haromszog(){
    int a, b, m;
    printf("A haromszog alapja: ");
    scanf("%d",&a);
    printf("A haromszog oldala: ");
    scanf("%d",&b);
    m = sqrt((b * b) - ((a * a) / 4.0));
    printf("Területe = %.2f\tKerulete = %.2f\n", ((a * m) / 2.0), (2 * b + a));
    sqrt(25);
}

//olvasd be a teglalap oldalait és szamold ki a keruletet és teruletet.
int teglalap(){
    int a, b;
    printf("A teglalap 'A' oldala: ");
    scanf("%d",&a);
    printf("A teglalap 'B' oldala: ");
    scanf("%d",&b);
    printf("Terulete = %d\tKerulete = %d",(a*b),(2*(a+b)));
}

int main(){
    //getint();
    //getkor();
    //getdatum();
    //koordinata();
    haromszog();
    teglalap();
    return 0;
}