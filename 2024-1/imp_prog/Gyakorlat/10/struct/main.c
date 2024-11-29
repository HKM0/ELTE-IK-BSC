#include "student.h"
#include "utils.h"

int main() {
    srand(time(NULL));
    Student** studs = malloc(sizeof(Student*) * STUD_CNT);
    fill_studs(studs);
    for (int i = 0; i < STUD_CNT; i++) {
        print_stud(*(studs[i]));
    }

    for (int i = 0; i < STUD_CNT; i++) {
        free(studs[i]);
    }
    free(studs);
    return 0;
}