#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(int argc, char* argv[]) {
    // a szamitogep determinisztikus alapbol
    srand(time(NULL)); // seed rand
    // nem veletlen a time(NULL) (eppeni idopont), viszont eleg nehez megmondani elore
    int max = 10000;
    if (argc > 1) {
        int n = atoi(argv[1]); // Ascii TO Integer - ha nem tartalmaz szamokat, akkor 0
        max = n > 0 ? n : max;
    }
    for (int i = 0; i < max; ++i) {
        printf("%d ", rand());
    }
    return 0;
}