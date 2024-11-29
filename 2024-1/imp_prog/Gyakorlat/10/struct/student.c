#include "student.h"
#include "utils.h"


void fill_studs(Student** studs) {
    for (int i = 0; i < STUD_CNT; i++) {
        studs[i] = student_init();
    }
}

void print_stud(Student st) {
    printf("Student id: %d - avg: %.2f - age: %d - %s - ",
        st.id, st.avg, st.age, map_student_type(st.type));
    if (st.type == BSC) {
        printf("courses: %d\n", st.info.course_num);
    }
    if (st.type == MSC) {
        printf("kki: %.2f\n", st.info.kki);
    }
    if (st.type == PHD) {
        printf("imp.f.: %.1f - Erdos num: %d\n", st.info.phd_info.impact_factor,
        st.info.phd_info.Erdos_num);
    }
}

char* map_student_type(StudentType type) {
    if (type == BSC) {return "bsc";}
    if (type == MSC) {return "msc";}
    if (type == PHD) {return "phd";}
    return "unknown";
}

Student* student_init() {
    Student* st = malloc(sizeof(Student));
    st->id = get_random(1000, 10000);
    st->avg = get_random(100, 501) / 100.0;
    st->age = (short)get_random(18, 25);
    st->type = get_random(0, 3);
    if (st->type == BSC) {
        st->info.course_num = get_random(8, 13);
    }
    if (st->type == MSC) {
        st->info.kki = get_random(100, 601) / 100.0;
    }
    if (st->type == PHD) {
        st->info.phd_info.impact_factor = get_random(0, 100) / 10.0;
        st->info.phd_info.Erdos_num = get_random(1, 8);
    }
    return st;
}

Student* nerd_student(Student** studs) {
    Student* nerd = studs[0];
    for (int i = 1; i < STUD_CNT; i++) {
        if (nerd->avg < studs[i]->avg) {
            nerd = studs[i];
        }
    }
    return nerd;
}