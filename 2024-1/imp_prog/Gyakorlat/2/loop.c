#include <stdio.h>
int main(){
    for (float i = 0; i <= 1.1; i+=0.1){
        printf("%.1f",i);
    }
    for (int i = 0; i<=10; i+=1){
        printf("%f",i/10.0);
    }
}