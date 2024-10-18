#include <stdio.h>
#include <stdlib.h>


char toUppper(char c) {
    if ('a' <= c && 'z'>= c){
        c =  c - 32;
    }
    return c;
}
char toLower(char c) {
    if ('A' <= c && 'Z'>= c){
        c = c + 32;
    }
    return c;
}

//void getString(){
//    char x;
//    while (scanf("%s", &x) != 1) {
//        while (getchar() != '\n');}
//        return x;
//}

char getInput(){
    char c = getchar();
    while(c == '\n'){
        c= getchar();
    }
}

int main(){
    char c;
    printf("csapass egy szamot teso");
    c= getInput();
    printf("toUpper: %c\n", toUppper(c));


    printf("csapass egy masik szamot teso");
    char b;
    b = getInput();
    printf("toLower: %c\n", toLower(b));



    char ch = getchar();
    int n = ch - '0';
    char c = getchar();
    while (c != EOF){
        printf("%c",&c);
    }



    return 0;
}