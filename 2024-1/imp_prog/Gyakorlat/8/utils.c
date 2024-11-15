#include <stdio.h>

void static_var(){
    static int st_var = 0;
    st_var++;
    printf("st_var: %d\n",st_var);
}

void f(int* c) {
    *c ++;
    printf("c: %d\n",*c);
}

void swap(int* a, int* b){
    int temp = *a;
    *a = *b;
    *b = temp;
}
int* maxvalue(int* a, int* b){
    return *a > *b ? a : b;
}
