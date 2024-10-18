#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int generate_random_number (int min, int max);

int main(){
    srand(time(NULL));
    int szamlalo=1;
    int max = 10, min=0;
    int target = rand() % (max-min)+min;
    int szam;
    printf("Tippelj egy szamot:\t\tV: ");
    scanf("%d",&szam);
    while (szam != target) {
        if (szam<target){
            printf("A szam nagyobb!\t\tV: ");
        }else{printf("A szam kissebb!\t\tV: ");}
        
        scanf("%d",&szam);
    }
    printf("megvan ggwp");



    return 0;
}   

int generate_random_number(int min, int max){
    return rand() % (max-min)+min;
}