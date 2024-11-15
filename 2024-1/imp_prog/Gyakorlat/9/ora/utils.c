#include "utils.h"

void count_string(){
    char str[128];
    printf("give me something pls pls\tV: ");
    //scanf, getchar
    fgets(str, 128, stdin);
    int size = 0, words = 1;
    while (str[size] != '\0')
    {
        if (str[size] == ' ')
        {
            words++;
        }
        size++;
    }
    printf("Size: %d, Words: %d\n", size, words);
    printf("Size: %d\n",strlen(str));
}

void string_compare(){
    char str1[128];
    char str2[128];
    printf("");
    fgets(str1, 128, stdin);
    printf("");
    fgets(str2, 128, stdin);

    int result = strcmp(str1, str2);
    // <0: str1 előbb van az abc-ben.
    //  0: str1 == str2
    // >0: str2 előbb van az abc-ben.
    if (result < 0){
        printf("(%s) elorebb van az abc-ben.\n",str1);
    }
    if (result == 0)
    {
        printf("A két string egyenlő.\n");

    }
    if (result == 0)
    {
        printf("(%s) elorebb van az abc-ben.\n",str2);
    }
}
void string_copy(){
    char str1[128];
    char str2[128];
    printf("First time: ");
    fgets(str1, 128, stdin);
    strcpy(str2,str1);
    //  hova másolsz, mit
    printf("str2: %s\n",str2);
}

void read_file(){
    char str[32][128];
    FILE* f = fopen("text.txt", "r");
    int line = 0;
    while (fgets(str[line], 128, f) !=NULL ){
        line++;
    }
    fclose(f);
    for (int i = 0; i < line; i++)
    {
        printf("%d. line: %s\n", i+1, str[i]);
    }
}
void write_file(){
FILE* f = fopen("text2.txt","w");
char str[128];
printf("Give me something good: ");
fgets(str, 128, stdin);
fprintf(f, "Line: %s", str);
fclose(f);
}
