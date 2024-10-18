#include <stdio.h>
int main() {
    int num;
    do {
        printf("Kérem a szamot: ");
        scanf("%d", &num);

    } while (num%2 !=0); 
    printf("A szam: %d\n", num);
    return 0;
}