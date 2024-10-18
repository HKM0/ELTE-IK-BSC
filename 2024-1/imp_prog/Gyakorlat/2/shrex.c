#include <stdio.h>
int main(){
    int a;
    printf("mi a szam? :");
    scanf("%d",&a);
    for (int i= 1; i<=a; i+=1){
        if (a%i==0)
        {
            printf("%d\n",i);
        }
    }
    int x,y;
    printf("kerem az elso szamot: ");
    scanf("%d",&x);
    printf("kerem a masodik szamot: ");
    scanf("%d",&y);

    int z, lkkt;
    if (x<y){
        z=x; x=y; y=z;
    }
    z=0;
    for (int i = y; z!=1; i+=1){
        if ((i%x==0) && (i%y==0)){
            z=1;lkkt=i;
            break;
        }
    }
    printf("Az LKKT erteke %d\n",lkkt);
//lnko
    int lnko;
    for (int i=1; i<=y;i+=1){
        if (x%i==0 && y%i==0)
        {
            lnko=i;
        }
    }
    printf("Az LNKO erteke: %d",lnko);
}
