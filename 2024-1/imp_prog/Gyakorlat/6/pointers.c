#include <stdio.h>

int maint(){
    int a = 5;
    int* p = &a;
    printf("a = %d\n&a=%d\n*p=%d\n&p=%d\n\n",a,&a,p,*p, &p);
    *p = 10;
    printf("a = %d\n&a=%d\n*p=%d\n&p=%d\n\n",a,&a,p,*p, &p);
    int** pp = &p;


    return 0;
}