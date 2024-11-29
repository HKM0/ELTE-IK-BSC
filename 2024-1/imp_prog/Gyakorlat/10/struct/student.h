#ifndef STUDENT_H
#define STUDENT_H

#define STUD_CNT 20

enum _StudentType {
    BSC, // 0
    MSC, // 1
    PHD // 2
};
typedef enum _StudentType StudentType;

struct PhDInfo {
    double impact_factor;
    int Erdos_num;
};

union _StudentInfo {
    int course_num;
    double kki;
    struct PhDInfo phd_info;
};
typedef union _StudentInfo StudentInfo;

struct _Student {
    int id;
    double avg;
    short age;
    StudentType type;
    StudentInfo info;
};
typedef struct _Student Student;

void fill_studs(Student** studs);
void print_stud(Student st);
Student* student_init();
char* map_student_type(StudentType type);
Student* nerd_student(Student** studs);

#endif // STUDENT_H