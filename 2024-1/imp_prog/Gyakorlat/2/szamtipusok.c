#include <stdio.h>

int main(){
    printf("int: %ld\n",sizeof(int));                   //4
    printf("long int: %ld\n",sizeof(long int));         //4
    printf("char: %ld\n",sizeof(char));                 //1
    printf("float: %ld\n",sizeof(float));               //4
    printf("double: %ld\n",sizeof(double));             //8
    printf("long double: %ld\n",sizeof(long double));   //12
    printf("random string: %ld\n",sizeof("abc"));       //4


    return 0;
}

//int               4
//long int          4
//char              1
//float             4
//double            8
//long double       12
//random string     4
