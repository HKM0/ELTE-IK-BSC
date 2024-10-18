#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int fajafejem(int min, int max);
void pontozo(int pont);

int main(){
    int mod = 0;
    int pont= 0;
    int modmax=0;
    while (mod!=4)
    {
        printf("1.\tEasy\n2.\tMedium\n3.\tHard\n4.\tExit\nV: ");
        scanf("%d",&mod);
        if (mod == 1){
            modmax=10;
        }else if (mod==2)
        {
            modmax=100;
        }else if (mod==3)
        {
            modmax=1000;
        }else if (mod==4){
            break;
        }else{printf("Hibas mod parameter");break;}
        
        int szamlalo=1;
        int target = fajafejem(0,modmax);
        int szam;
        printf("Tippelj egy szamot:\t\tV: ");
        scanf("%d",&szam);
        while (szam != target) {
            if (szam<target){
                printf("A szam nagyobb!\t\tV: ");
            }else{printf("A szam kissebb!\t\tV: ");}
            szamlalo+=1;
            scanf("%d",&szam);
        }
        pontozo(szamlalo);
    }
    return 0;
}
int fajafejem(int min, int max){
    return rand() % (max-min)+min;}

void pontozo(int pont){
    if (pont>9) {printf("\nBena vagy xD\n");
    }else if (pont>5){printf("\nSzodaval elmegy\n");
    }else if (pont>2){printf("\nugyes vagy\n");
    }else if (pont==0){printf("\nMazlista\n");
    }
}
