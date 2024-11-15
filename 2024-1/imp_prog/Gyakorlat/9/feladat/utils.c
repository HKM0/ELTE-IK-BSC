#include "utils.h"

void read_file() {
    char str[32][128];
    char str2[32][128];
    FILE* f = fopen("text1.txt", "r");
    FILE* f2 = fopen("text2.txt", "r");
    int line1 = 0;
    int line2 = 0;

    while (fgets(str[line1], 128, f) != NULL) {
        line1++;
    }
    fclose(f);

    while (fgets(str2[line2], 128, f2) != NULL) {
        line2++;
    }
    fclose(f2);

    FILE* f3 = fopen("text2.txt", "w");
    for (int i = 0; i < line1 && i < line2; i++) {
        int num1 = atoi(str[i]);
        int num2 = atoi(str2[i]);
        fprintf(f3, "%s %s => %d\n", str[i], str2[i], num1 * num2);
    }
    fclose(f3);
}

void palindrome() {
    char str[128];
    char forditott[128];
    int kecske, i, j = 0;

    printf("Adj meg egy szoveget: ");
    fgets(str, 128, stdin);

    kecske = strlen(str);
    if (str[kecske - 1] == '\n') {
        str[kecske - 1] = '\0';
    }

    for (i = 0; str[i]; i++) {
        str[i] = tolower(str[i]);
    }

    kecske = strlen(str);
    for (i = kecske - 1; i >= 0; i--) {
        forditott[j++] = str[i];
    }
    forditott[j] = '\0';

    if (strcmp(str, forditott) == 0) {
        printf("\"%s\" Egy palindrom.\n", str);
    } else {
        printf("\"%s\" Nem palindrom.\n", str);
    }
}