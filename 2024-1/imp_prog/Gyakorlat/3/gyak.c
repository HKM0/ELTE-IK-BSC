#include <stdio.h>
int main(){
    printf("mondj egy evszamot: ");
    int num;
    scanf("%d",&num);
    if ((num%4==0 && num%100!=0) || num%400==0)
    {
        printf("%d szokoev.",num);
    }else{printf("%d nem  szokoev.",num);}
    
    return 0;
}
//gyak.exe