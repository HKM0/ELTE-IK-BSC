#include <stdio.h>
#include <stdbool.h>

int main() {
    int a =1;
    printf("a: %d\n", a);
    int b = 3.94;
    printf("b: %d %f\n", b, (float)b);
    int c = 'a';
    printf("c: %d %c\n",c, c);

    //int d = "abc";
    //printf("d: %d %s\n", d, d);
    
    int e = true;
    printf("e: %d\n", e);
    int e = false;
    printf("e: %d\n", e);
    
    return 0;
}