#include <stdio.h>
int main(){
    for (int i = 1; i <=10 ; i+=1){
        printf("\n");
        for (int x = 0; x <=10; x+=1){printf("\t%d",i*x);}
    }
}