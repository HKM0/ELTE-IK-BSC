#include <stdio.h>
#include <stdlib.h>

int main() {
    int prev = -1; // mert ugye csak pozitiv szamokat generalunk
    int curr;
    while (scanf("%d", &curr) == 1) {
        if (prev > curr) {
            fprintf(stderr, "inversion %d > %d", prev, curr);
            exit(1);
        }
        prev = curr;
    }
}