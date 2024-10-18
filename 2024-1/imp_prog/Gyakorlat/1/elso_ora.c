#include <stdio.h>

//int main(){
//    printf("The sum of %d and %d is %d\n",10,20,10+20);
//    return 0;
//}


//int main() {
//    char name[30];
//    int age;
//
//    printf("Hogy hívnak? ");
//    scanf("%s", name);
//    int c;
//    while((c=getchar()!= '\n' && c != EOF))
//    
//    printf("Hány éves vagy? ");
//    scanf("%d", age);
//    printf("Szia %d éves %s! \n", age, name);
//
//    return 0;
//}  
int main() {
    int szam1;
    int szam2;
    printf("Mi az első szám? ");
    scanf("%d",&szam1);
    printf("Mi a második szám? ");
    scanf("%d",&szam2);
    printf("\nA két szám hányadosa %f",(float)szam1/szam2);
    return 0;
}
