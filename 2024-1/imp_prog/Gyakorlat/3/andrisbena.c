#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int difficulty();
int generate_random_number(int min, int max);

int main(){
    srand(time(NULL));
    int max = difficulty();
    int min = 0;
    int target = generate_random_number(min, max);
    int guess;
    int tippek = 1;
    printf("Tippelj egy szamot 0 es 10 kozott!");
    scanf("%d", &guess);
    while(guess != target) {
        if(guess > target){
            printf("Az ismeretlen szam KISEBB a tippelttol!");
        }else{
            printf("Az ismeretlen szam NAGYOBB a tippelttol!");
        }
        printf("Nem talat, tippelj ujra!");
        scanf("%d", &guess);
        tippek = tippek + 1;
    }
    printf("Eltalaltad, YIPEEEEEE!!!\n");
    if(tippek==1){
        printf("szerencsed van\n");
    }if(tippek==2){
        printf("mazlista\n");
    }if(tippek==9){
        printf("bena vagy\n");
    }

    printf("Tippeid szama: %d", tippek);
    return 0;

}

int generate_random_number(int min, int max){
    return rand() % (max - min) + min;
}

int difficulty(){
    printf("Valassz nehezsegi szintet\n 1. Easy = 1\n 2. Medium = 2\n 3. Hard = 3\n 4. Exit\n");
    int nehezseg;
    int max;
    scanf("%d,", &nehezseg);
    if(nehezseg == 1){
        max = 10;
    }if(nehezseg == 2){
        max = 100;
    }if(nehezseg == 3){
        max == 1000;
    }
    return max;
}

void menu(){
    difficulty()
}