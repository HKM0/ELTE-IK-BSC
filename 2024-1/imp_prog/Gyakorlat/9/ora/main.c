#include "utils.h"

int main(int argc, char** argv) {
    printf("Program: %s\n",argv[0]);
    if (argc != 2){
        printf("Bird bird bird!\n");
        return 1;
    }
    int choice = atoi(argv[1]);
    switch (choice)
    {
    case 0:
        printf("Life goes like aaaaaaaaaaaaaaaaaaaaaaaa");
        break;    
    case 1:
        count_string();
        break;
    case 2:
        string_compare();
        break;
    case 3:
        string_copy();
        break;
    case 4:
        read_file();
        break;
    case 5:
        write_file();
        break;
    default:
        printf("There is no such Peter Griffin");
        break;
    }

    return 0;
}