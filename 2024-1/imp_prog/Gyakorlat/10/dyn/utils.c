#include "utils.h"

void read_string() {
    printf("Give me something: ");
    char* str = malloc(sizeof(char));
    int size = 0;
    str[size] = getchar();
    while (str[size] != '\n') {
        size += 1;
        str = realloc(str, sizeof(char) * (size+1));
        str[size] = getchar();
    }
    str[size] = '\0';
    printf("str: %s\n", str);
    free(str);
}