#include <stdio.h>
int sum(int N);
int max(int N);
int masmax(int N);
double atlag(int N);

int main(){
    int Z;
    //tömbök
    //C -ben statikus adatszerkezet, előre megadott típussal, előre megadott mérettel.
    //Példa: 
    //int T[10];
    //int S[] = {1,2,3,4};
    //int U[10] = {0}; //ez itt nem működik, csak C++ ban.
    //a tömbök indexelhetőek, a 10 elemű az 0-9 ig. Vagyis a 0 az első index.

    //ezt ne csináld bozo mert elkaplak
    //int n = 3;
    //n = 5;
    //int N[n];
    //mégegyszer blyet, lefordul de nem szabad mert a fordulási időben előre tudni kell a lista méretét.

    // feladatok: 

    // ... kap egy tombot, es osszegzi az elemeit.
    //printf("\nKap egy tombot, es osszegzi az elemeit. Hany elemu legyen a lista?: ");
    //scanf("%d",&Z);
    //printf("%d",sum(Z));

    // ... kap egy tombot, és megkeresi a maximalis elemet.
    //printf("\nKap egy tombot, es megkeresi a maximalis elemet. Hany elemu legyen a lista?: ");
    //scanf("%d",&Z);
    //printf("%d",max(Z));

    // ... kap egy tombot, és magadja a masodik legkisebb elemet.
    //printf("\nKap egy tombot, es magadja a masodik legkisebb elemet. Hany elemu legyen a lista?: ");
    //scanf("%d",&Z);
    //printf("%d",masmax(Z));

    // ... kap egy tombot, és megadja az elemek atlagat
    printf("\nKap egy tombot, es megadja az elemek atlagat. Hany elemu legyen a lista?: ");
    scanf("%d",&Z);
    printf("%.2f",atlag(Z));

    // ... kap két tombot, egyforma meretu, az egyikben szamok, a masikban súlyok, szorozgasd őket össze.
    printf("\nkap ket tombot, egyforma meretu, az egyikben szamok, a masikban sulyok, szorozgasd oket össze. Hany elemu legyen a lista?: ");
    scanf("%d",&Z);
    printf("%.2f",atlag(Z));    

    // ... kap egy tombot,




return 0;
}

int sum(int N){
    int T[N],z = 0;
    for (int i=0;i<N;i++){
        printf("Kerem az elso szamot: ");
        scanf("%d",&T[i]);
    }
    for (int i=0; i<N;i++){
        z+= T[i];
    }
    return z;
}

int max(int N){
    int T[N],z = 0;
    for (int i=0;i<N;i++){
        printf("Kerem az elso szamot: ");
        scanf("%d",&T[i]);
    }
    for (int i=0; i<N; i++){
        if (z<T[i]){
            z=T[i];
        }
    }
    return z;
}

int masmax(int N){
    int T[N],z = 0,h = 0;
    for (int i=0;i<N;i++){
        printf("Kerem az elso szamot: ");
        scanf("%d",&T[i]);
    }
    for (int i=0;i<N;i++){
        if (z<=T[i]){
            h=z;
            z=T[i];
        }
    }
    return h;
}

double atlag(int N){
    int T[N],z = 0;
    for (int i=0;i<N;i++){
        printf("Kerem az elso szamot: ");
        scanf("%d",&T[i]);
    }
    for (int i=0;i<N;i++){
        z+=T[i];
    }
    return z / N;
}



