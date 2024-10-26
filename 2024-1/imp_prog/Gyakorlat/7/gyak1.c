#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <time.h> 

//elso feladat
int helpmexd(char a) { 
    //visszaadja a hexadecimális karakter hozzá tartozó értékét
    char hex[16] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
    for (int i = 0; i < 16; i++) {
        if (hex[i] == a) {
            return i;
        }
    }
    return -1; 
}
void elso_feladat() {
    char hex[100]; 
    int decimal = 0;
    int size = 0;
    printf("Kerek egy hexadecimalis szamot: ");
    scanf("%s", hex);
    while (hex[size] != '\0') {
        size++;
    }
    for (int i = 0; i < size; i++) {
        decimal += helpmexd(hex[size -1 - i]) * pow(16, i); //fordított sorrendben.
    }
    printf("Decimalisan: %d\n", decimal);
}

//masodik feladat  (elegem van xd)
void metrix_xD(int n, int matrix[n][n]) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            matrix[i-1][j-1] = i * j;
        }
    }
}
void kiiras(int n, int matrix[n][n]) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            printf("%4d", matrix[i-1][j-1]);
        }
        printf("\n");
    }
}
void masodik_feladat(){
    int n;
    printf("Add meg az [N x N] -es matrix meretet: ");
    scanf("%d", &n);
    int matrix[n][n];
    metrix_xD(n, matrix);
    kiiras(n, matrix);
}

//harmadik feladat
int harmadik_seged(int a){
    int z=0;
    for (int i = 1; i<=a; i++){
        z+=i;
    }
    return z;
}
void harmadik_feladat(){
    printf("Kerek egy szamot: ");
    int a; scanf("%d",&a);
    printf("Az elso %d szam osszege: %d\n",a,harmadik_seged(a)); 
}

//negyedik feladat
void negyedik_seged(int a) {
    for (int i = 1; i <= 10; i++) {
        printf("%0.0f, ", pow(a, i)); //pow a hatványozás a math.h ból.
    }
    printf("\n"); 
}
void negyedik_feladat() {
    printf("Kerek egy szamot: ");
    int a,b; 
    scanf("%d", &a);
    negyedik_seged(a);
}

//otodik feladat
void otodikcucc(int a) {
    int szamlista[100];
    int z = a;
    int szamlalo = 0;
    while (z > 0) {
        szamlista[szamlalo++] = z % 10;
        z /= 10;
    }
    if (szamlalo > 2) {
        int tmp = szamlista[szamlalo - 1];
        szamlista[szamlalo - 1] = szamlista[0];
        szamlista[0] = tmp;
        for (int i = szamlalo - 1; i >= 0; i--) {
            printf("%d", szamlista[i]);
        }
    }
}
void otodik_feladat() {
    printf("Kerek egy minimum 3 jegyu szamot: ");
    int a;
    scanf("%d", &a);
    if (a<100)
    {
        printf("Kevesebb mint 3 jegyu szamot adtal meg.");
    }else{
        printf("A megcserelt szam: ");
        otodikcucc(a);
        printf("\n");
    }
}

//hatodik feladat
void hatodik_seged(int arr[], int size) {
    srand(time(NULL)); //a jelenlegi időt használja a random számhoz. (#include <time.h> -ból)
    for (int i = 0; i < size; i++) {
        arr[i] = rand() % (100); // 0 és 100 közötti szám.
    }
}
void hatodik_feladat(){
    int tomb[100],a,z = 0;
    printf("Hany elemu legyen a tomb?\tV: ");
    scanf("%d",&a);
    hatodik_seged(tomb,a);
    for (int i = 0; i < a; i++)     //hany eleme nagyobb mint 50?
    {
        if (tomb[i]>50)
        {
            z+=1;
        }
    }
    printf("A tombnek osszesen %d darab 50-nel nagyobb eleme van.",z);
}

int main() {   
    elso_feladat();         //első feladat
    masodik_feladat();      //második feladat
    harmadik_feladat();     //harmadik feladat
    negyedik_feladat();     //negyedik feladat
    otodik_feladat();       //ötödik feladat
    hatodik_feladat();      //hatodik feladat

    return 0;
}