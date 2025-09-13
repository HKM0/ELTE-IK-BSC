#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <time.h> //rand() % oszlopok

#define ALMASZAM 10
#define KIGYOHOSSZ 10
#define SOR 10
#define OSZLOP 20

void palyaletrehoz(char palya[SOR][OSZLOP], int kigyo[KIGYOHOSSZ][2]){
    for (int i = 0; i < SOR; i++)
    {
        for (int j = 0; j < OSZLOP; j++)
        {
            palya[i][j] = ' ';
        }
    }

    for (int i = 0; i < ALMASZAM; i++){ 
        int randomY = rand() % SOR;
        int randomX = rand() % OSZLOP;
        while (palya[randomY][randomX]=='a')
        {
            randomY = rand() % SOR;
            randomX = rand() % OSZLOP;
        }
        palya[randomY][randomX]='a';
    }

    int kigyokezdoY = SOR/2;
    int kigyokezdoX = OSZLOP/2;
    kigyo[0][0] = kigyokezdoY;
    kigyo[0][1] = kigyokezdoX;
    for (int i = 1; i < KIGYOHOSSZ; i++)
    {
        kigyo[i][0] = kigyokezdoY;
        kigyo[i][1] = kigyokezdoX-i;
    }
}

void palyaKiiras(char palya[SOR][OSZLOP], int kigyo[KIGYOHOSSZ][2]){
    for (int i = 0; i < OSZLOP+2; i++)
    {
        printf("#");
    }
    for (int i = 0; i < SOR; i++)
    {
        printf("\n#");
        for (int j = 0; j < OSZLOP; j++)
        {
            bool kigyokerdojel = false;
            for (int k = 0; k < KIGYOHOSSZ; k++)
            {
                if (kigyo[k][0]==i && kigyo[k][1]==j)
                {
                    if (k==0)
                    {
                        printf("8");
                    }else{
                        printf("0");
                    }
                    kigyokerdojel = true;
                }
            }
            if (!kigyokerdojel)
            {
                printf("%c",palya[i][j]);
            }
        }
        printf("#");
    }
    printf("\n");
    for (int i = 0; i < OSZLOP+2; i++)
    {
        printf("#");
    }
}

int mozgatas(char palya[SOR][OSZLOP], int kigyo[KIGYOHOSSZ][2], int *maradoalmaszam){
    printf("\nLepes: ");
    int irany = getchar();
    while (irany != 'w' && irany != 'a' && irany != 's' && irany != 'd') {
        if (irany!= '\n')
        {
            printf("Hibas lepes, kerek egy ujat: ");
        }
        irany = getchar();
    }

    int kigyofejY = kigyo[0][0];
    int kigyofejX = kigyo[0][1];

    if (irany == 'w') {
        kigyofejY -= 1;
    } else if (irany == 'a') {
        kigyofejX -= 1;
    } else if (irany == 's') {
        kigyofejY += 1;
    } else if (irany == 'd') {
        kigyofejX += 1;
    } else {
        printf("hibas lepes");
    }

    // falnak ment
    if (kigyofejX < 0 || kigyofejX >= OSZLOP || kigyofejY < 0 || kigyofejY >= SOR) {
        return -2;
    }

    // maganak ment
    for (int i = 1; i < KIGYOHOSSZ; i++) {
        if (kigyo[i][0] == kigyofejY && kigyo[i][1] == kigyofejX) {
            return -1;
        }
    }

    // elfogytak az almak
    if (palya[kigyofejY][kigyofejX] == 'a') {
        (*maradoalmaszam) -= 1;
        palya[kigyofejY][kigyofejX] = ' ';
        if (*maradoalmaszam == 0) {
            return -3;
        }
    }

    for (int i = KIGYOHOSSZ - 1; i > 0; i--) {
        kigyo[i][0] = kigyo[i - 1][0];
        kigyo[i][1] = kigyo[i - 1][1];
    }
    kigyo[0][0] = kigyofejY;
    kigyo[0][1] = kigyofejX;

    return 0;
}

int main(){
    srand(time(NULL)); 
    char palya[SOR][OSZLOP];
    int kigyo[KIGYOHOSSZ][2];
    int maradoalmaszam = ALMASZAM;
    palyaletrehoz(palya, kigyo);
    int kod = 0;
    while (kod == 0 && maradoalmaszam != 0)
    {
        palyaKiiras(palya,kigyo);
        kod = mozgatas(palya, kigyo, &maradoalmaszam);
    }
    if (kod==-1)
    {
        printf("Magadnak mentel blud");
    }else if (kod==-2)
    {
        printf("Falnak mentel");
    }else if (kod==-3 || kod==0)
    {
        printf("Gratulalok nyertel!");
    }else if (kod==-4){
        printf("Kiléptél!");
    }
    return 0;
}