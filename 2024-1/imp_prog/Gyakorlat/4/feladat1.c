#include <stdio.h>
#include <stdlib.h>

int main(){


int a = 1;
int b = 2;

a = a + b;
b = a - b;
a = a - b;

printf("%d\n",a);
printf("%d",b);
int x = 2;
int y = 3;
x = x*y;
y= x/y;
x= x/y;
printf("\n%d\n",x);
printf("%d",y);
return 0;
}